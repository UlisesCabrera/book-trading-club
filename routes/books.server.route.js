var express = require('express');
var router = express.Router();
var booksController = require('../controllers/books.server.controller');

/* GET home page. */
router.get('/', booksController.sendAllBooks);
router.post('/', booksController.addNewBook);
router.delete('/:bookId', booksController.deleteBook);
router.put('/',  booksController.requestBook);


module.exports = router;