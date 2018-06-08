const express = require('express');
const mongoose = require('mongoose');
const parser = require('body-parser');
const path = require('path');
const logger = require('morgan');

const port = process.env.PORT || 8000;
const app = express();
const { Schema } = mongoose;

app.set('view engine', 'ejs')
app.set('views', path.resolve('views'));


app.use(parser.urlencoded({ extended: true }));
app.use(logger('dev'));

mongoose.connect('mongodb://localhost/authors_and_books');
mongoose.connection.on('connected', () => console.log('mongodb connected'));


const authorSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
    min: 5,
  },
  isAlive: {
    type: Boolean,
    default: true,
  },
  books: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Book'
    }
  ]
});


const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  pages: {
    type: Number,
    required: true,
    min: 1,
  },
  year: Number,
  publisher: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Author'
  }
});

const Author = mongoose.model('Author', authorSchema);
const Book = mongoose.model('Book', bookSchema);


app.get('/', function (request, response) {
  response.render('index');
});


app.get('/authors', function (request, response) {
  Author.find({})
    .populate('books')
    .then(authors => {
      response.render('authors/index', { authors });
    })
    .catch(console.log);
});

app.get('/authors/new', function (request, response) {
  response.render('authors/new');
});

app.post('/authors', function (request, response) {
  console.log(request.body);

  Author.create(request.body)
    .then(author => {
      console.log('created author', author);

      response.redirect('/authors');
    })
    .catch(error => {
      response.render('authors/new', {
        errors: Object.keys(error.errors).map(key => error.errors[key].message)
      });
    });
});

app.get('/authors/:author_id', function (request, response) {
  Author.findById(request.params.author_id)
    .then(author => {
      response.render('authors/show', { author });
    })
    .catch(console.log);
});


app.get('/books', function (request, response) {
  Book.find({})
    .populate('author')
    .then(books => {
      response.render('books/index', { books });
    })
    .catch(console.log);
});

app.get('/books/new', function (request, response) {
  Author.find({})
    .then(authors => {
      response.render('books/new', { authors });
    })
    .catch(console.log);

});

app.post('/books', function (request, response) {
  console.log('book post', request.body);
  Book.create(request.body)
    .then(book => {
      console.log('created book', book);

      return Author.findById(book.author)
        .then(author => {
          author.books.push(book._id);

          return author.save();
        })
        .then(() => {
          response.redirect('/books');
        });
    })
    .catch(error => {
      response.render('books/new', {
        errors: Object.keys(error.errors).map(key => error.errors[key].message)
      });
    });
})

app.listen(port, () => console.log(`express server listening on port ${port}`));

