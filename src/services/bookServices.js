const { nanoid } = require('nanoid');
const books = require('../models/books');

// Services function to add a new book
const addBookServices = (request, h) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;

  // Input validation
  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Failed to add book. Please fill in the book name',
    });
    response.code(400);
    return response;
  }

  if (pageCount < readPage) {
    const response = h.response({
      status: 'fail',
      message: 'Failed to add book. readPage cannot be greater than pageCount',
    });
    response.code(400);
    return response;
  }

  // Creating a unique ID using nanoid
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = (pageCount === readPage);

  // Creating a new book object
  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  // Adding the new book to the books array
  books.push(newBook);

  // Checking the success of adding the book
  const isSuccess = books.filter((book) => book.id === id).length > 0;

  // Creating and returning the response based on the operation result
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Book successfully added',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Failed to add book',
  });
  response.code(500);
  return response;
};

// Services function to get all books
const getAllBooksServices = (request, h) => {
  const { name, reading, finished } = request.query;

  // Initializing the list of books to be filtered
  let filteredBooks = books;

  // Filtering process based on search parameters
  if (name !== undefined) {
    filteredBooks = filteredBooks.filter((book) => book
      .name.toLowerCase().includes(name.toLowerCase()));
  }

  if (reading !== undefined) {
    filteredBooks = filteredBooks.filter((book) => book.reading === !!Number(reading));
  }

  if (finished !== undefined) {
    filteredBooks = filteredBooks.filter((book) => book.finished === !!Number(finished));
  }

  // Creating and returning the response with the list of filtered books
  const response = h.response({
    status: 'success',
    data: {
      books: filteredBooks.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  });
  response.code(200);
  return response;
};

// Services function to get a book by ID
const getBookByIdServices = (request, h) => {
  const { id } = request.params;
  const book = books.filter((b) => b.id === id)[0];

  // Creating and returning the response based on the operation result
  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Book not found',
  });
  response.code(404);
  return response;
};

// Services function to update book information by ID
const editBookByIdServices = (request, h) => {
  const { id } = request.params;
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;
  const updatedAt = new Date().toISOString();
  const index = books.findIndex((book) => book.id === id);

  // Checking the success of searching for the ID
  if (index !== -1) {
    // Input validation
    if (name === undefined) {
      const response = h.response({
        status: 'fail',
        message: 'Failed to update book. Please fill in the book name',
      });
      response.code(400);
      return response;
    }

    if (pageCount < readPage) {
      const response = h.response({
        status: 'fail',
        message: 'Failed to update book. readPage cannot be greater than pageCount',
      });
      response.code(400);
      return response;
    }

    // Creating an updated book object
    const finished = (pageCount === readPage);
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      updatedAt,
    };

    // Creating and returning the response based on the operation result
    const response = h.response({
      status: 'success',
      message: 'Book successfully updated',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Failed to update book. ID not found',
  });
  response.code(404);
  return response;
};

// Services function to delete a book by ID
const deleteBookByIdServices = (request, h) => {
  const { id } = request.params;

  // Searching for the book index based on the ID
  const index = books.findIndex((note) => note.id === id);

  // Checking the success of searching for the ID
  if (index !== -1) {
    // Deleting the book from the books array
    books.splice(index, 1);
    // Creating and returning the response based on the operation result
    const response = h.response({
      status: 'success',
      message: 'Book successfully deleted',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Book failed to delete. ID not found',
  });
  response.code(404);
  return response;
};

// Exporting all Services functions to be used in other files
module.exports = {
  addBookServices,
  getAllBooksServices,
  getBookByIdServices,
  editBookByIdServices,
  deleteBookByIdServices,
};
