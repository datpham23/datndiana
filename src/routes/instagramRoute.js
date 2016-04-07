var express = require('express');
var router = express.Router();
var co = require('co');
var config = require('../../config');
var app = require('../../devServer');
var ig = require('instagram-node').instagram();
var config = require('../../config');
var _ = require('lodash');
var winston = require('winston');

var getIP = require('external-ip')();


getIP(function (err, ip) {
  ig.use({
    client_id: config.instagram.client_id,
    client_secret: config.instagram.client_secret
  });

  ig.del_subscription({ all: true }, function(err, subscriptions, remaining, limit){
  });

  winston.log(`calling back on http://${ip}:${process.env.PORT}`);

  ig.add_tag_subscription('datdianawedding', `http://${ip}:${process.env.PORT}/callback`, {}, (err, result, remaining, limit)=>{
  });
});


router.get('/hashtag', (req, res) => {
  ig.use({
    client_id: config.instagram.client_id,
    client_secret: config.instagram.client_secret
  });

  ig.tag_media_recent(req.query.tag, {}, (err, medias, pagination, remaining, limit)=>{
    if (err)
      res.status(500).json(err);

    medias.pagination = pagination;

    res.json({
      posts : medias,
      pagination : pagination
    });
  });
});




module.exports = router;
