const mongoose = require("mongoose"); 

 
 const mongoURL='mongodb+srv://kv878432_db_user:kirankv@cluster0.ocowqjk.mongodb.net/'

 mongoose.connect(mongoURL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

 const db=mongoose.connection;

 //Define event listener for database connection
 db.on('connected', () => {
    console.log('Connected to MongoDB server');
 });

 db.on('error', (err) => {
    console.log('MongoDB connection error:',err);
 });

 db.on('disconnected', () => {
    console.log(' MongoDB disconnected');
 });

 //Export the database connection
 module.exports=db;