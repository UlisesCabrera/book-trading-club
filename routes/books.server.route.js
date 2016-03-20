var express = require('express');
var router = express.Router();
var booksController = require('../controllers/books.server.controller');

/* GET home page. */
//router.get('/books', indexController.serveIndex);
router.post('/', booksController.addNewBook);

module.exports = router;