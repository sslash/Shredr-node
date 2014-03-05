var responseClient = {
	send : function(res, err, doc) {
		if ( err ) {
			res.send(err, 400);
		} else {
			res.send({}, 200);
		}
	}
};

module.exports = responseClient;