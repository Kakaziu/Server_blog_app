try{
  require('../src/database');
  require('dotenv').config();
  const express = require('express');
  const cors = require('cors');
  const { resolve } = require('path');

  const app = express();

  const userRoutes = require('../src/routes/user');
  const tokenRoutes = require('../src/routes/token');
  const postRoutes = require('../src/routes/post');

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(resolve(__dirname, 'uploads')));

  app.use('/users', userRoutes);
  app.use('/tokens', tokenRoutes);
  app.use('/posts', postRoutes);

  app.listen(process.env.PORT, () =>{
    console.log('Server is running...');
  });
}catch(e){
  console.log(e);
}
