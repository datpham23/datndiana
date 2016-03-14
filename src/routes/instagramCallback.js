var express = require('express');
var router = express.Router();
var _ = require('lodash');

router.get("/callback", function(req,res){
	if (!req.query['hub.challenge']) return res.sendStatus(400);
	return res.send(req.query['hub.challenge']);
});

router.post("/callback", function(req, res){
	var bundles = req.body;

	// Instagram returns a bundle object which has an id where you must make another call to get all the posts
	// Client side will make call using the following url pattern to get latests posts
	//'http://api.instagram.com/v1/tags/' + bundle.object_id + '/media/recent?client_id='+configs.instagram.client_id;
	_.each(bundles, function(bundle) {
    io.sockets.emit('newPosts', bundle);
	});

	res.end();
});

module.exports = router;
