// MONGODB PW: QD3WPnFHdkLZx8zM
// CONNECTION: mongodb+srv://Access:QD3WPnFHdkLZx8zM@cluster0-tbb51.mongodb.net/test?retryWrites=true&w=majority

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

const app = express();

mongoose.connect('mongodb+srv://Access:QD3WPnFHdkLZx8zM@cluster0-tbb51.mongodb.net/test?retryWrites=true&w=majority')
.then(() => {
    console.log('Successfully connected to mongoDB Atlas!');
})
.catch((error) => {
    console.log('Unable to connect to mongoDB Atlas');
    console.error(error);
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use(bodyParser.json());

    // Serving static files from "public" folder
    app.use(express.static('public'));

  app.use('/images', express.static(path.join(__dirname, 'images')));
  
  app.use('/api/stuff', stuffRoutes);
  app.use('/api/auth', userRoutes);

module.exports = app;
