 const mongoose=require('mongoose');

//  define mongoDB connection url
 const mongoURL='mongodb://localhost:27017/hotels'

 //set up mongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/hotels")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


 //Get the default connection
 //Mongoose maintains a default connection 
 // object representing the MonGoDB connection.
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