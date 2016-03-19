/*global angular*/

module.exports = angular.module('HomePageModule')
 .controller('HomePageController', ['$scope','usersFactory', 
    function($scope, usersFactory){
     
     $scope.currentUser = function(){
         return usersFactory.user ? usersFactory.user : null;
     };   
    
}]);