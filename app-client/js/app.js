/*global angular*/
require('angular');
require('angular-route');

window.$ = window.jQuery = require('jquery');
require('bootstrap');

//require sub-modules
require("./homePage/homePage.module");
require("./profilePage/profilePage.module");

angular.module('BookTradingClub', ['ngRoute', 'HomePageModule', 'ProfilePageModule'])
    .config(function($routeProvider, $locationProvider) {
      $routeProvider
       .when('/', {
        templateUrl: 'views/homePage/homePage.html',
        controller: 'HomePageController'
      })
      .when('/profile/:user', {
        templateUrl: 'views/profilePage/profilePage.html',
        controller: 'ProfilePageController'
      });
}).controller('BookTradingClubController',['$scope', 
    function($scope){
        $scope.currentUser = function() {
            return window.user ? window.user : null;
        };
}]);