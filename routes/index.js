var express = require('express');
var router = express.Router();
var dbUrl = 'mongodb://localhost:27017/resume';
var MongoClient = require('mongodb').MongoClient;
var path = require('path');
var publicPath = path.resolve('./public');


/* GET home page. */
router.get('/', function(req, res, next) {
  MongoClient.connect(dbUrl, (err, db) => {
    var collection = db.collection('data');
    collection.find({
      "username": "Lxxyx"
    }).toArray((err, docs) => {
      res.render('resume', docs[0]);
      db.close();
    })
  })
});

router.get('/r/:username', function(req, res, next) {
  MongoClient.connect(dbUrl, (err, db) => {
    var collection = db.collection('data');
    collection.find({
      "username": req.params.username
    }).toArray((err, docs) => {
      res.render('resume', docs[0]);
      db.close();
    })
  })
});

router.get('/g', function(req, res) {
  res.sendFile(publicPath + '/g.html')
});

router.post('/gr', function(req, res) {
  MongoClient.connect(dbUrl, (err, db) => {
    var collection = db.collection('data');
    var jsonData = JSON.stringify(req.body);
    collection.insertOne(jsonData,null, (err, data) => {
      if (data) {
        res.json(data)
      } else {
        res.json('failed')
      }
    })
  })
})

module.exports = router;
