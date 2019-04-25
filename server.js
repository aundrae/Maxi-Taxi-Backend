const firebase=require('firebase')
var config = {
    apiKey: "AIzaSyDkUHXPIpLCx9G6cMbrdE9h7nKyGlx9HhI",
    authDomain: "express-demo-54676.firebaseapp.com",
    databaseURL: "https://express-demo-54676.firebaseio.com",
    projectId: "express-demo-54676",
    storageBucket: "express-demo-54676.appspot.com",
    messagingSenderId: "157079182412"
  };
firebase.initializeApp(config);

const express = require('express');
const bodyParser = require('body-parser');
//Routes
const transactionsRoute=require('./app/routes/transactions');
const userRoute=require('./app/routes/users')
//Database Collections
const userData=require('./app/database/users')('Users')
const transactionsdb=require('./app/database/database')('transactions');
const helmet=require('helmet');
const cors=require('cors');
const app= express();

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(helmet())
app.use(cors())


transactionsRoute(app,transactionsdb);
userRoute(app,userData)
//const port=8000;
const port = process.env.PORT;

app.listen(port,()=>{
    console.log("Live on port "+port);
});