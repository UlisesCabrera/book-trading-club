/*global angular*/

module.exports = angular.module('BookPagesModule')
 .controller('AllBookPageController', ['$scope','BooksSvc', 
    function($scope, BooksSvc){
   
    $scope.test = 'hello All Books';
    
    $scope.newBook = {
      name: '',
      imgUrl: '',
      description:'',
      owner_id : '',
      lenders_id : []
    };
    
    // will hold all the books
    $scope.books = [];
    
    $scope.requestStatus = function(user, book){
        
        if (user.pendingRequestsToUsers.indexOf(book._id) >= 0) {
            return 'Requested';
        } else {
            return 'Request';
        }
          
    };
    
    
    BooksSvc.getAllBooks()
        .then(
            function(res){
            	if (res.data.state === 'success') {
            		$scope.books = res.data.books;
                
            	} else {
            		$scope.message = res.data.message;
            	}
            },
            function(error) {
	        	$scope.message = 'error getting to the server : ' + error.status + ' ' + error.statusText;
	        }              
    );
    
    $scope.addBook = function(userId) {
      $scope.newBook.owner_id = userId;
      
      BooksSvc.newBook($scope.newBook)
        .then(
            function(res){
                 if (res.data.state === "success") {
                				$scope.books.push(res.data.book);
            	   		} 
          	   			 // error, grab the error message from the response and display it on the form.
          	   		  $scope.message = res.data.message;
            	   		$scope.newBook = {name:'', imgUrl: ''};
        	   		    // hides modal
        	   		    $('#newBookModal').modal('hide');                  				
            },
            function(error) {
      	        $scope.message = 'error getting to the server : ' + error.status + ' ' + error.statusText;
	        } 
        );
    };
    
    $scope.deleteBook = function(bookId, bookIdx){
        if (confirm('Are you sure you want to delete this book?')) {
            BooksSvc.deleteBook(bookId)
            .then(
                function(res){
              	   	 $scope.books.splice(bookIdx, 1);
              	   	 // error, grab the error message from the response and display it on the form.
              	   	 $scope.message = res.data.message;
                },
                function(error) {
          	        $scope.message = 'error getting to the server : ' + error.status + ' ' + error.statusText;
    	        } 
            );
        }
    };
    
    
    $scope.requestBook = function(book, user) {
            BooksSvc.requestBook(book, user)
                .then(
                 function (res) {
                     if (res.data.state == 'success'){
                         window.user = res.data.user;
                     }
                     $scope.message = res.data.message;
                     
                 },
                 function(error) {
          	        $scope.message = 'error getting to the server : ' + error.status + ' ' + error.statusText;
    	        } 
            );
    };
    
}]);