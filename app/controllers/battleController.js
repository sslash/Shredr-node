var mongoose   = require('mongoose'),
    BattleRequest = mongoose.model('BattleRequest'),
    client     = require('../libs/responseClient'),
    fileHandler = require('../libs/fileHandler');

var sendBrNotification = function (br, res) {
    br.battlee.addNotification({
        type : 3,
        body : 'New Battle Request received from ' + br.battler.username,
        id  : new Date().getTime(),
        referenceId : br._id.toString()
    })
    .then(function() {
        return client.send(res, null, br);
    })
    .fail(function(err) {
        return client.error(res, err);
    });
};

exports.createBattleRequest = function (req, res) {
    var br = new BattleRequest({
        battler : req.user.id,
        battlee : req.body.battlee._id,
        rounds  : req.body.rounds,
        statement : req.body.statement,
        mode : req.body.mode
    });

    if ( req.body.jamtrackId ) {
        br.jamtrackId = req.body.jamtrackId;
    }

    br.save(function(err,doc){
        if ( err ) { return client.error(res,err)}
        BattleRequest.findById(doc._id)
        .then(function(br){
            client.send(res, null, br);
        })
        .fail(function (err, res) {
            client.error(res, err);
        });
    });
};

// Initial battle request file. Either jamtrack or video.
exports.uploadInitialBrFile = function (req, res) {

    var battleRequest = {};
    BattleRequest.findById(req.params.id)
    // store video file
    .then(function(result) {
        battleRequest = result;
        var args = {};
        args.path = req.params.mode === 'Advanced' ?
            './public/audio/br/' : './public/video/br/';

        return fileHandler.storeVideoFile(req, args);
    })
    // Save the reference to the local file
    .then(function(result) {
        battleRequest.fileId = result.file.name;
        battleRequest.save();
    })
    // send notification to battlee, in case br is finished
    .then(function() {
        if ( req.params.mode === 'Simple' ) {
            return sendBrNotification(battleRequest, res);
        } else {
            return client.send(res, null, battleRequest);
        }
    })
    .fail (function(err) {
        client.error(res, err);
    });
};

// initial video uploaded
exports.uploadInitialBrVideoAdvanced = function (req, res) {
    var battleRequest = {};
    BattleRequest.findById(req.params.id)
    // store video file
    .then(function(doc) {
        battleRequest = doc;
        var args = {};
        args.path = './public/video/br/';
        return fileHandler.storeVideoFile(req, args);
    })
    // Save the reference to the local file
    .then(function(result) {
        battleRequest.advVidFile = result.file.name;
        battleRequest.save();
    })
    // send notification to battlee
    .then(function(br) {
        return sendBrNotification(battleRequest, res);
    })
    .fail (function(err) {
        return client.error(res, err);
    });
};

exports.getBattleRequest = function (req, res) {
    BattleRequest.findById(req.params.id)
    .then(function(result){
        client.send(res, null, result);
    })
    .fail(function(err){
        client.error(res, err);
    });
};

exports.updateBattleRequest = function (req, res) {
    var battleRequst = {};
    BattleRequest.findById(req.params.id)
    .then(function(br){
        battleRequest = br;
        br.startFrame = req.body.startFrame;
        br.startSec = req.body.startSec;
        br.save();
    })
    .then(function(br) {
        client.send(res, null, battleRequest);
    })
    .fail(function(err){
        client.error(res, err);
    });
}
