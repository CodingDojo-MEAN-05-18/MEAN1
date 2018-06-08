const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');

const port = process.env.PORT || 8000;
const { Schema } = mongoose;
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));

mongoose.connect('mongodb://localhost/authors__books');
mongoose.connection.on('connected', () => console.log('connected to mongodb'));


const authorSchema = new Schema({
  name: {
    type: String,
    required: [true, 'please provide author name'],
    trim: true,
  },
  age: Number,
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
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Author'
  },
  pages: {
    type: Number,
    required: true,
    min: [1, 'No book has less than one page']
  },
  year: Number,
  publisher: String,
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

  // new Author({
  //   name: request.body.name,
  //   age: request.body.age,
  //   isAlive: request.body.isAlive
  // })
  Author.create(request.body)
    .then(author => {
      console.log('author created', author);
      response.redirect('/authors');
    })
    .catch(error => {
      const errors = Object.keys(error.errors).map(key => error.errors[key].message);
      console.log(errors);
    });
});


app.get('/books', function (request, response) {
  Book.find({})
    // mongoose field, NOT the model name
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
  console.log('book', request.body);

  Book.create(request.body)
    .then(book => {
      console.log('created book', book);

      return Author.findById(book.author)
        .then(author => {
          author.books.push(book._id);

          return author.save()
        })
        .then(() => {
          response.redirect('/books');
        });
    })
    .catch(error => {
      const errors = Object.keys(error.errors).map(key => error.errors[key].message);
      console.log(errors);
    });
});

app.listen(port, () => console.log(`express server listening on port ${port}`));
