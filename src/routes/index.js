// Importing Service functions from the './Services' file
const {
  addBookServices,
  getAllBooksServices,
  getBookByIdServices,
  editBookByIdServices,
  deleteBookByIdServices,
} = require('../services/bookServices');

// Configuring routes to handle HTTP requests
const routes = [
  {
    method: 'POST', // HTTP POST method to add a book
    path: '/books', // Endpoint path to add a book
    handler: addBookServices, // Service function to handle the request
  },
  {
    method: 'GET', // HTTP GET method to get all books
    path: '/books', // Endpoint path to get all books
    handler: getAllBooksServices, // Service function to handle the request
  },
  {
    method: 'GET', // HTTP GET method to get a book by ID
    path: '/books/{id}', // Endpoint path to get a book by ID
    handler: getBookByIdServices, // Service function to handle the request
  },
  {
    method: 'PUT', // HTTP PUT method to edit a book by ID
    path: '/books/{id}', // Endpoint path to edit a book by ID
    handler: editBookByIdServices, // Service function to handle the request
  },
  {
    method: 'DELETE', // HTTP DELETE method to delete a book by ID
    path: '/books/{id}', // Endpoint path to delete a book by ID
    handler: deleteBookByIdServices, // Service function to handle the request
  },
];

// Exporting the routes array to be used in other files that require it
module.exports = routes;
