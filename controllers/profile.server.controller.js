require('dotenv').load();
var ObjectID = require('mongodb').ObjectID;

var MongoClient = require("mongodb").MongoClient;
var assert = require("assert");

exports.acceptRequest = function(req,res,next){

  //Step1: Grab all the required ids, book request, book owner and user requesting
  var bookRequestedId = new ObjectID(req.body.book._id);
  var bookOwnerId = new ObjectID(req.body.book.owner_id);
  var userRequestingId = new ObjectID(req.body.user._id);
  

  MongoClient.connect(process.env.MONGOURI, function(err, db) {
       assert.equal(err, null, 'Error connecting to the database'); 
       
       var users = db.collection('users');
       var books = db.collection('books');
       //Step2: send requestor user id to the list of lenders id
       books.findOneAndUpdate({'_id' : bookRequestedId}, {
           $push: {
               'lenders_id' : req.body.user._id
           }
       },
       {
          returnOriginal: false
       }, function(err, result1){
           assert.equal(err, null, 'Error adding to user to book lender list');
           
           if (result1.ok == 1) {
               //Step3: set status to approved on requestor pending request to users status
               users.findOneAndUpdate({'_id' : userRequestingId, 'pendingRequestsToUsers.book._id' : req.body.book._id}, {
                   "$set" : {
                       'pendingRequestsToUsers.$.status' : 'approved'
                   }
               }, function(err, result2){
                   assert.equal(err, null, 'Error approving request on user requesting');
                   
                   if (result2.ok == 1){
                       // step4: remove request from pending request from user array
                       users.findOneAndUpdate(
                           {'_id' : bookOwnerId}, 
                           {
                           "$pull" : { "pendingRequestsFromUsers" : { "book._id" : req.body.book._id }}
                           },
                       {
                          returnOriginal: false
                       }, function(err, result3) {
                          assert.equal(err, null, 'Error error removing from pending request list');
                          
                          if (result3.ok == 1) {
                              //send response to client
                              res.send({state:'success', message:'request approved'});
                          } else {
                              res.send({state:'failure', message:'request denied'});
                          }
                       }
                       );
                   } else {
                      res.send({state:'failure', message:'request denied'});
                    }
               });
           } else {
              res.send({state:'failure', message:'request denied'});
           }
       });
  });
  
  
};


exports.declineRequest = function(req,res,next){
  
  //Step1: Grab all the required ids, book request, book owner and user requesting
  var bookOwnerId = new ObjectID(req.body.book.owner_id);
  var userRequestingId = new ObjectID(req.body.user._id);
  

  MongoClient.connect(process.env.MONGOURI, function(err, db) {
       assert.equal(err, null, 'Error connecting to the database'); 
       
       var users = db.collection('users');
       
       //Step2: set status to declined on requestor pending request to users status
       users.findOneAndUpdate({'_id' : userRequestingId, 'pendingRequestsToUsers.book._id' : req.body.book._id}, {
           "$set" : {
               'pendingRequestsToUsers.$.status' : 'declined'
           }
       }, function(err, result2){
           assert.equal(err, null, 'Error approving request on user requesting');
           
           if (result2.ok == 1){
               // step4: remove request from pending request from user array
               users.findOneAndUpdate(
                   {'_id' : bookOwnerId}, 
                   {
                   "$pull" : { "pendingRequestsFromUsers" : { "book._id" : req.body.book._id }}
                   },
               {
                  returnOriginal: false
               }, function(err, result3) {
                  assert.equal(err, null, 'Error error removing from pending request list');
                  
                  if (result3.ok == 1) {
                      //send response to client
                      res.send({state:'success', message:'request denied'});
                  } else {
                      res.send({state:'failure'});
                  }
               }
               );
           } else {
              res.send({state:'failure'});
            }
       });    
  });    
    
    
};



exports.cancelRequest = function(req,res,next){
  
  //Step1: Grab all the required ids, book request, book owner and user requesting
  var bookOwnerId = new ObjectID(req.body.book.owner_id);
  var bookId = req.body.book._id;
  var userRequestingId = new ObjectID(req.user._id);
  
  
  MongoClient.connect(process.env.MONGOURI, function(err, db) {
       assert.equal(err, null, 'Error connecting to the database'); 
       
       var users = db.collection('users');
       
       //Step2: remove request from pending request to user
       users.findOneAndUpdate(
           {'_id' : userRequestingId}, 
           {
           "$pull" : { "pendingRequestsToUsers" : { "book._id" : bookId }}
                       
           }, function(err, result2){
                assert.equal(err, null, 'Error removing request from pending request to user');
           
           if (result2.ok == 1){
               // step3: remove request from pending request from owner user array
               users.findOneAndUpdate(
                   {'_id' : bookOwnerId}, 
                   {
                   "$pull" : { "pendingRequestsFromUsers" : { "book._id" : req.body.book._id }}
                   },
               {
                  returnOriginal: false
               }, function(err, result3) {
                  assert.equal(err, null, 'Error error removing from pending request list');
                  
                  if (result3.ok == 1) {
                      //send response to client
                      res.send({state:'success', message:'request denied'});
                  } else {
                      res.send({state:'failure'});
                  }
               }
               );
           } else {
              res.send({state:'failure'});
            }
       });    
  }); 
    
};