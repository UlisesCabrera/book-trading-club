require('dotenv').load();

var MongoClient = require("mongodb").MongoClient;
var assert = require("assert");

exports.serveIndex = function(req, res, next) {
    
    //connecting to the database
    MongoClient.connect(process.env.MONGOURI, function(err, db){
        assert.equal(err, null, 'Error occured while connecting to the database');
    });    
    
    
    res.render('index', { title: 'Book Trading Club', user: JSON.stringify(req.user), message: req.flash('error') });
};