const express = require('express');
const bodyParser = require('body-parser');
//Routes
const transactionsRoute=require('./app/routes/transactions');
//Database Collections
const transactionsdb=require('./app/database/database')('transactions');
const helmet=require('helmet');
const cors=require('cors');
const app= express();

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(helmet())
app.use(cors())


transactionsRoute(app,transactionsdb);

//const port=8000;
const port = process.env.PORT;

app.listen(port,()=>{
    console.log("Live on port "+port);
});