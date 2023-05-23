const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const session = require('express-session');
const blogRoutes = require('./routes/blogRoutes');
const userRoutes = require('./routes/userRoutes');
const User = require('./models/user');
const PORT = process.env.PORT || 5000;
const app = express();
const path = require('path');

// Load environment variables
dotenv.config();

// Connect to MongoDB
const dbURI = process.env.MONGO_URI;

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));

// Set up session middleware
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
  })
);

// Set up view engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Custom middleware to pass loggedIn state and path to all views
app.use((req, res, next) => {
  res.locals.path = req.path;
  res.locals.loggedIn = req.session.loggedIn || false;
  next();
});

// Routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/create', (req, res) => {
  if (req.session.loggedIn) {
    res.render('blogs/create', { title: 'Create' });
  } else {
    res.redirect('/login');
  }
});

app.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/create');
  } else {
    res.render('login', { title: 'Login' });
  }
});

app.get('/register', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/create');
  } else {
    res.render('register', { title: 'Register' });
  }
});

app.post('/register', async (req, res) => {
  try {
    // Registration logic here

    req.session.loggedIn = true; // Set loggedIn session variable
    res.redirect('/create');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error registering user');
  }
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/logout', (req, res) => {
  req.session.loggedIn = false; // Clear the loggedIn session variable
  res.redirect('/login');
});

app.use('/blogs', blogRoutes);
app.use('/users', userRoutes);

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
