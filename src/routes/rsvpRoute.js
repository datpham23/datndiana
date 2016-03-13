var express = require('express');
var router = express.Router();
var co = require('co');
var config = require('../../config');
var winston = require('winston');
var r = require('rethinkdbdash')();
var app = require('../../devServer');
var nodemailer = require('nodemailer');


const db = 'dnd';
const table = 'guests';


router.post('/link/:id', (req, res) => {
  co(function*() {
    winston.log(`RSVP ${req.params.id} : ${req.body}`);
    var guest = yield r.db(db)
      .table(table)
      .get(req.params.id);
    if (!guest)
      res.status(404).send('Cannot find guest');

    guest.guests = req.body;
    guest.hasRSVP = true;

    var result = yield r.db(db)
      .table(table)
      .update(guest);

    res.send('RSVP Completed');
  })

});


router.post('/manual', (req, res) => {
  co(function*() {
    console.log('here');
    winston.log(`RSVP : ${req.body}`);

    var dbRes = yield r.db(db)
      .table(table)
      .insert(req.body);

    var transporter = nodemailer.createTransport('smtps://datdianawedding%40gmail.com:skeptical@smtp.gmail.com');
    // var mailOptions = {
    //   from: 'Dat and Diana 💑 <datdianawedding@gmail.com>',
    //   to: 'datdianawedding@gmail.com',
    //   subject: `${guest.name} has rsvp`,
    //   text: JSON.stringify(guest),
    //   html: ''
    // };
    //
    // transporter.sendMail(mailOptions, function(error, info){
    //   console.log(error);
    //   if(error){
    //       return winston.log(error);
    //   }
    //   winston.info('Message sent: ' + info.response);
    // });

    res.send('RSVP Completed');
  })

});


module.exports = router;
