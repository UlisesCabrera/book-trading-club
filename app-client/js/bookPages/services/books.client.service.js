/*global angular*/
module.exports = angular.module('BookPagesModule', []).service('BooksSvc', ['$http', function($http) {
            // creates new book
            this.newBook = function(newBook) {
                return $http.post('/books', newBook);
            };
}]);