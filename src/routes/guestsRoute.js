var express = require('express');
var router = express.Router();
var co = require('co');
var config = require('../../config');
var winston = require('winston');
var r = require('rethinkdbdash')();
var app = require('../../devServer');


const db = 'dnd';
const table = 'guests';


router.post('/', (req, res) => {
  console.log(req.body);
  res.json({
    test : 1
  })
});


module.exports = router;
