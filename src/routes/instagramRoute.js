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

    // var page = pagination;
    // while(page.next){
    //   pagination.next((err, posts, nextPage, remaining, limit)=>{
    //     console.log(posts);
    //     page = nextPage;
    //   })
    // }

    // var posts = medias;
    //
    //
    // pagination.next((err,post,remaining,limit)=>{
    //   posts.concat(post)
    // })
    //


    res.json(medias);
  });
});





module.exports = router;
