const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


app.post('/restaurants.html', (req, res) => {
    res.redirect('/restaurants.html')
})

/* Use to store favorites, temporarily */
let favorites = [];
app.use(cors());

/* Configuring body parser middleware */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* Add to favorite list */
app.post('/favorite', (req, res) => {
    const favorite = req.body;

    /* Output the book to the console for debugging */
    console.log(favorite);
    favorites.push(favorite);

    /* Redirect to favorites page once added to array */
    res.redirect('../favorites.html')
});

/* Get all favorites */
app.get('/favorites', (req, res) => {
    res.json(favorites);
});

/* Return favorite ID using link */
app.get('/favorite/:id', (req, res) => {
    // Reading isbn from the URL
    const id = req.params.id;

    // Searching books for the isbn
    for (let favorite of favorites) {
        if (favorite.id === id) {
            res.json(id);
            return;
        }
    }

    // Sending 404 when not found something is a good practice
    res.status(404).send('Book not found');
});

module.exports = app;
