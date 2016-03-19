/*global angular*/

module.exports = angular.module('HomePageModule')
 .controller('HomePageController', ['$scope', 
    function($scope){
    $scope.test = 'hello homepage'
}]);