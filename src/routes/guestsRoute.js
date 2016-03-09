var express = require('express');
var router = express.Router();
var co = require('co');
var config = require('../../config');
var winston = require('winston');
var r = require('rethinkdbdash')();
var app = require('../../devServer');
var nodemailer = require('nodemailer');

var accountSid = 'AC3e86077b20caba3eb3d4de0593ebf4a3';
var authToken = 'fcccb5f564738b814864c04008a0c773';
var client = require('twilio')(accountSid, authToken);


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
        subject: req.body.subject.replace(/{name}/g,guest.name).replace(/{id}/g,guest.id),
        text: req.body.message.replace(/{name}/g,guest.name).replace(/{id}/g,guest.id),
        html: ''
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

router.post('/send-text-message', (req, res) => {
  co(function*(){
    var results = yield r.db(db).table(table).run();
    results.forEach(guest=>{
      winston.info(`Sending Email To ${guest.name}: ${guest.phone} `);
      var message = {
        from: "+14084571714",
      	to: guest.phone,
      	body: req.body.message.replace(/{name}/g,guest.name).replace(/{id}/g,guest.id)
      };

      if(req.body.url.length > 0)
        message.mediaUrl = req.body.url;

      client.messages.create(message, (err, message)=>{
        if(err){
          winston.info(`Unable to send text message`);
          console.log(err);
        }else{
          winston.info(`Text message sent`);
        }
      });
    });
  });
  res.send('Sending Text Messages To Guests')
});


module.exports = router;
