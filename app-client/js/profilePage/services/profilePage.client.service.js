/*global angular*/
module.exports = angular.module('ProfilePageModule', []).service('ProfileBooksSvc', ['$http', function($http) {
            
            this.getUserBooks = function(userId){
                return $http.get('/books/' + userId );  
            };
            
            this.acceptRequest = function(request){
                return $http.put('/profile/accept', request);
            };
            
            this.declineRequest = function(request){
                return $http.put('/profile/decline', request);
            };
            
            this.cancelRequest = function(request){
                return $http.put('/profile/cancel', request);
            };
            
            this.returnBook = function(book){
                return $http.put('/profile/return', book);
            };
            
            // creates new book
            this.newBook = function(newBook) {
                return $http.post('/books', newBook);
            };
            
            this.deleteBook = function(bookId) {
                return $http.delete('/books/' + bookId);  
            };
            
}]);