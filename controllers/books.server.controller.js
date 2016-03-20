require('dotenv').load();

var MongoClient = require("mongodb").MongoClient;
var assert = require("assert");

exports.addNewBook = function(req, res, next) {
    //connecting to the database
    MongoClient.connect(process.env.MONGOURI, function(err, db){
        assert.equal(err, null, 'Error occured while connecting to the database');
        
        var books = db.collection('books');
        
        // checks if book is already in the collection
        books.find({ name: req.body.name}).toArray(function(err, docs){
          assert.equal(err, null,'Error finding book');
          //if found, advise user to request book
          if (docs.length >= 1) {
            console.log('book found');
            res.send({state:'failure', book: null, message:'Book is already on the collection, please request book from owner'});
          } else {
                books.insertOne(req.body, function(err, result){
                  assert.equal(err, null,'error inserting book');
                  assert.equal(result.result.ok, 1, 'problem inserting book');
                  // and return inserted user
                  console.log('inserted book: ' + result.insertedCount);
                  res.send({state:'success', book: result.ops[0], message:'New Book Added'});
                });
        }});
        
        
    });    
};