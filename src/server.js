const express = require('express')
const path = require('path');
const configViewEngine = require('./config/viewEngine');
const webRoutes = require('./routes/web');
const routerAPI = require('./routes/api');
const fileUpload = require('express-fileupload');
const { MongoClient } = require('mongodb');


require('dotenv').config();
const mysql = require('mysql2');
const connection = require('./config/database');





const app = express()
const port = process.env.PORT;
const hostname = process.env.HOST_NAME;

// config fileUpload
app.use(fileUpload());

// Config template engine
configViewEngine(app)

// Get data from form input
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Khai báo route
app.use('/', webRoutes);
app.use('/v1/api/', routerAPI);


// test connection;
(async () => {
  // Using mongoose
  await connection();

  // Using mongodb driver
  // Connection URL
  // const url = process.env.DB_HOST_WITH_DRIVER;
  // const client = new MongoClient(url);

  // // Database Name
  // const dbName = process.env.DB_NAME;

  // await client.connect();
  // console.log('Connected successfully to server');
  // const db = client.db(dbName);
  // const collection = db.collection('customers');
  app.listen(port, hostname, () => {
    console.log(`Example app listening on port ${port}`)
  })
})()

