var express = require('express');
var router = express.Router();
var co = require('co');
var config = require('../../config');
var app = require('../../devServer');
var ig = require('instagram-node').instagram();


ig.use({
  client_id: config.instagram.client_id,
  client_secret: config.instagram.client_secret
});

router.get('/hashtag', (req, res) => {
  ig.tag_media_recent(req.query.tag, {}, (err, medias, pagination, remaining, limit)=>{
    if (err)
      res.status(500).json(err);

    res.json(medias);
  });
});





module.exports = router;
