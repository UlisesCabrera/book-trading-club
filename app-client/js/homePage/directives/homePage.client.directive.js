/*global angular*/
module.exports = angular.module('HomePageModule')
 .directive('navDir',function(){
     return {
         templateUrl: 'directive-views/homePage/navigation.html'
     };
 });