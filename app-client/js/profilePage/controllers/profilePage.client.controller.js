/*global angular*/

module.exports = angular.module('ProfilePageModule')
 .controller('ProfilePageController', ['$scope','$routeParams', 'ProfileBooksSvc', 
    function($scope, $routeParams, ProfileBooksSvc){

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
    };
    
     
}]);