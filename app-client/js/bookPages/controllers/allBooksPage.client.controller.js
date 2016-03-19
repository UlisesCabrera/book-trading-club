/*global angular*/

module.exports = angular.module('BookPagesModule')
 .controller('AllBookPageController', ['$scope', 
    function($scope){
    $scope.test = 'hello All Books'
}]);