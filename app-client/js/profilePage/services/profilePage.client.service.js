/*global angular*/
module.exports = angular.module('ProfilePageModule', []).service('ProfileBooksSvc', ['$http', function($http) {
            
            this.getUserBooks = function(userId){
                return $http.get('/books/' + userId );  
            };
            
            // creates new book
            this.newBook = function(newBook) {
                return $http.post('/books', newBook);
            };
            
            this.deleteBook = function(bookId) {
                return $http.delete('/books/' + bookId);  
            };
            
}]);