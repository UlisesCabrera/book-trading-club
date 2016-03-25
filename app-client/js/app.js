/*global angular*/
require('angular');
require('angular-route');

window.$ = window.jQuery = require('jquery');
require('bootstrap');

//require sub-modules
require("./homePage/homePage.module");
require("./profilePage/profilePage.module");
require("./bookPages/bookPages.module");

angular.module('BookTradingClub', ['ngRoute', 'HomePageModule', 'ProfilePageModule','BookPagesModule'])
    .config(function($routeProvider, $locationProvider) {
      $routeProvider
       .when('/', {
        templateUrl: 'views/homePage/homePage.html',
        controller: 'HomePageController'
      })
      .when('/books',{
        templateUrl: 'views/bookPages/allBooksPage.html',
        controller: 'AllBookPageController'
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