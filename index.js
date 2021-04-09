let express= require("express");
let cors=require("cors");
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

require('dotenv').config();
let mongoose = require('mongoose');
let app=express();
let port = process.env.PORT|| 5000;
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
var request = require('request');

app.use(cors());
app.use(urlencodedParser);
app.use(bodyParser.json())
const uri = process.env.db_url;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
  
})



app.listen(port,()=>{
console.log("Server is up and running");
});