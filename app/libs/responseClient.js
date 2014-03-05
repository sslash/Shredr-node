var responseClient = {
	send : function(res, err, doc) {
		console.log('err: ' + err );
		console.log('doc: ' + doc );

		if ( err ) {
			res.send(err, 400);
		} else {
			res.send(doc);
		}
	}
};

module.exports = responseClient;