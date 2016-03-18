/*global angular*/

module.exports = angular.module('HomePageModule')
 .controller('HomePageController', ['$scope', 
    function($scope){
        
        $scope.message = 'Testing Angular';
    
}]);