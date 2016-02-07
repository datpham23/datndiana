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


router.get('/', (req, res) => {
  r.db(db)
    .table(table)
    .run().then(results=>{
      res.json(results);
    }).catch(error=>{
      res.status(500).send('Failed Inserting Guests '+error);
    });
});

router.post('/', (req, res) => {
  r.db(db)
    .table(table)
    .insert(req.body)
    .run().then(dbRes=>{
      res.send('Saved Guests');
    }).catch(error=>{
      res.status(500).send('Failed Inserting Guests '+error);
    })
});

router.get('/:id', (req, res) => {
  r.db(db)
    .table(table)
    .get(req.params.id)
    .run().then(result=>{
      if(result)
        res.json(result);
      else
        res.status(404).send('Guest Not Found');
    }).catch(error=>{
      console.log(error);
      res.status(500).send('Failed Inserting Guests '+error);
    })
});

router.post('/send-email', (req, res) => {
  co(function*(){
    var results = yield r.db(db).table(table).run();
    res.send('Sending Email To Guests')
    var transporter = nodemailer.createTransport('smtps://datdianawedding%40gmail.com:skeptical@smtp.gmail.com');


    results.forEach(guest=>{
      winston.info(`Sending Email To ${guest.name}`);
      var mailOptions = {
        from: 'Dat and Diana 💑 <datdianawedding@gmail.com>',
        to: guest.email,
        subject: req.body.subject.replace(/{name}/g,guest.name).replace(/{id}/g,guest.name),
        text: req.body.message.replace(/{name}/g,guest.name).replace(/{id}/g,guest.id),
        //html: '<b>Hello world 🐴</b>'
      };

      transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return winston.log(error);
        }
        winston.info('Message sent: ' + info.response);
      });
    });
  });
});


module.exports = router;
