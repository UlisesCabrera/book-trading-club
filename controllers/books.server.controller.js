require('dotenv').load();
var ObjectID = require('mongodb').ObjectID;

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


exports.sendAllBooks = function(req, res, next){
    
    //connecting to the database
    MongoClient.connect(process.env.MONGOURI, function(err, db){
        assert.equal(err, null, 'Error occured while connecting to the database');
        
        var books = db.collection('books');
        
        // sends books to client
        books.find({}).toArray(function(err, docs){
          assert.equal(err, null,'Error finding books');
          if (docs.length >= 1) {
            console.log('books found');
            res.send({state:'success', books: docs});
          } else {
            res.send({state:'failure', books: null, message:'Error finding books'});
        }});
        
        
    });
    
};

exports.deleteBook = function (req, res, next){
    MongoClient.connect(process.env.MONGOURI, function(err, db) {
        
        assert.equal(err, null, 'Error deleting books');
        
        var bookId = req.params.bookId;
        
        // delete book from collection
        var o_id = new ObjectID(bookId);
        
        var books = db.collection('books');
        
        books.deleteOne({'_id' : o_id}, function(err, result){
          
          assert.equal(err, null, 'error deleting book');
          
          if (result.deletedCount == 0) {
            res.send({state:'failure', book: null, message:'Book was not deleted'});
          } else {
            res.send({state:'success', book: null, message:'Book deleted'});
          }
          
        });
        
    });  
};