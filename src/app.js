const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(bodyParser.json());
app.use('/api', userRoutes);

const mongoUri = 'mongodb://0.0.0.0:27018/mydatabase';

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

module.exports = app;
