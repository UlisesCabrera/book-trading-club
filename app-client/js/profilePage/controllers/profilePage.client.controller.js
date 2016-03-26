/*global angular*/

module.exports = angular.module('ProfilePageModule')
 .controller('ProfilePageController', ['$scope','$routeParams', 'ProfileBooksSvc', 
    function($scope, $routeParams, ProfileBooksSvc){

     $scope.removeOrCancel = function(request) {
        if (request.status == 'pending'){
         return 'Cancel';
        } else {
         return 'Remove';
        }
     };

     ProfileBooksSvc.getUserBooks($routeParams.user)
      .then(
       function(res){
        console.log(res);
        $scope.myBooks =  res.data.books.ownedBooks;
        $scope.borrowedBooks = res.data.books.borrowedBooks;
      }, 
      function(err){
        $scope.messageProfile = err;
      }
    );
    
    $scope.acceptRequest = function(request, requestId){
     if (confirm('if you accept you will not be able to delete the book until the book is returned, is that ok?')) {
       ProfileBooksSvc.acceptRequest(request)
        .then(function(res){
          if (res.data.state == 'success'){
            window.user.pendingRequestsFromUsers.forEach(function(requests, idx){
                if (requests.book._id == requestId) {
                  window.user.pendingRequestsFromUsers.splice(idx, 1);
                }
            });
          }
          
        },
           function(err){
            $scope.messageProfile = err;
           }
         );
     }
    };
    
    $scope.declineRequest = function(request, requestId){
     ProfileBooksSvc.declineRequest(request)
      .then(function(res){
        if (res.data.state == 'success'){
          window.user.pendingRequestsFromUsers.forEach(function(requests, idx){
              if (requests.book._id == requestId) {
                window.user.pendingRequestsFromUsers.splice(idx, 1);
              }
          });
        }
        
      },
         function(err){
          $scope.messageProfile = err;
         }
       );
    };
    
    $scope.cancelRequest = function(request) {
      ProfileBooksSvc.cancelRequest(request)
       .then(function(res){
         if (res.data.state == 'success'){
           window.user.pendingRequestsToUsers.forEach(function(requests, idx){
               if (requests.book._id == request.book._id ) {
                 window.user.pendingRequestsToUsers.splice(idx, 1);
               }
           });
         }
         
       },
          function(err){
           $scope.messageProfile = err;
          }
        );
    };
    
    $scope.returnBook = function(book) {
      ProfileBooksSvc.returnBook(book)
      .then(function(res){
         if (res.data.state == 'success'){
           $scope.borrowedBooks.forEach(function(borrowedBook, idx){
               if (borrowedBook._id == book._id ) {
                 $scope.borrowedBooks.splice(idx, 1);
                 window.user.pendingRequestsToUsers.forEach(function(requests, idx){
                  if (requests.book._id == book._id ) {
                    window.user.pendingRequestsToUsers[idx].status = 'Returned';
                  }
                });
               }
           });
         }
         
       },
          function(err){
           $scope.messageProfile = err;
          }
        );
    };
    
}]);