/*global angular*/

module.exports = angular.module('BookPagesModule')
 .controller('AllBookPageController', ['$scope','BooksSvc', 
    function($scope, BooksSvc){
   
    $scope.test = 'hello All Books';
    
    $scope.newBook = {
      name: '',
      imgUrl: '',
      owner_id : '',
      lenders_id : []
    };
    
    // will hold all the books
    $scope.books = [];
    
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
    
    
    
}]);