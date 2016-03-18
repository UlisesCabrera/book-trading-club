/*global angular*/
require('angular');
window.$ = window.jQuery = require('jquery');
require('bootstrap');

//require sub-modules
require("./homePage/homePage.module");

angular.module('BookTradingClub', ['HomePageModule']);


