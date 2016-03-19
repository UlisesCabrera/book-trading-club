/*global angular*/

//exports module
module.exports = angular.module('BookPagesModule',[]);

// require all controllers, services, directives
require("./controllers/allBooksPage.client.controller");
require("./directives/bookPages.client.directive");