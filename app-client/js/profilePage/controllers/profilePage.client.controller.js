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
     
}]);