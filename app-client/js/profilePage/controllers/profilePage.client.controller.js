/*global angular*/

module.exports = angular.module('ProfilePageModule')
 .controller('ProfilePageController', ['$scope','$routeParams', 
    function($scope, $routeParams){
     $scope.user = JSON.parse($routeParams.user);
}]);