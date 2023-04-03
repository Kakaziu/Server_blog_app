require('./src/database');
const express = require('express');

const app = express();

const userRoutes = require('./src/routes/user');
const tokenRoutes = require('./src/routes/token');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoutes);
app.use('/tokens', tokenRoutes);

module.exports = app;
