var responseClient = {
	send : function(res, err, doc) {
		console.log('err: ' + err  + ', doc: ' + doc);
		if ( err ) {
			res.send(err, 400);
		} else {
			res.send(doc, 200);
		}
	},

	error : function (res, errorMsg) {
		res.send({error : errorMsg}, 400);
	}
};

module.exports = responseClient;