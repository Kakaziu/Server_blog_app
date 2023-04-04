require('./src/database');
const express = require('express');
const { resolve } = require('path');

const app = express();

const userRoutes = require('./src/routes/user');
const tokenRoutes = require('./src/routes/token');
const postRoutes = require('./src/routes/post');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(resolve(__dirname, 'uploads')));

app.use('/users', userRoutes);
app.use('/tokens', tokenRoutes);
app.use('/posts', postRoutes);

module.exports = app;
