//  console.log("server file is running");

// //  function add(a,b){
// //     return a+b;
// //  }

// // var add=function(a,b){
// //     return a+b;
// // }

// // var add =(a,b)=>{
// //     return a+b;
// // }

// var add=(a,b)=>a+b;

//  var result =add(2,7);
//  console.log(result);

//  (function(){
//     console.log('prince')
//  })();

// function callback(){
//     console.log('Now addition is successfully completed');
// }
// const add=function(a,b,callback){
//     var result=a+b;
//     console.log('result: '+result);//main function work completed
//     callback();
// }

// add(3,113993,callback);

// const add=function(a,b,kiran){
//     var result=a+b;
//     console.log('result: '+result);//main function work completed
//     kiran();
// }

// add(2,3,function(){
//     console.log('add completed');

// });

// add (2,3,()=>console.log('add completed'));//inline function

// const { log } = require('console');
// var fs=require('fs');
// var os=require('os');

// var user=os.userInfo();
// console.log(user.username);


// fs.appendFile('greeting.txt','Hi '+ user.username + '!\n', ()=>{
//     console.log('File is createdd');
// });

// console.log(fs);

// const notes=require('./notes.js');
// var _ = require('lodash');//underscore-random definining name

// console.log('server file is available');
// var age=notes.age;
// var result=notes.addNumber(age+18,10);
// console.log(age);
// console.log('result is now '+result);

// var data =["person", "person",1,2,3,1,2,'name','age','2'];
// var filter=_.uniq(data);
// console.log(filter);

// console.log(_.isString(3));


// const jsonString='{"name": "John", "age":30,"city":"New York"}';
// const jsonObject=JSON.parse(jsonString);
// console.log(jsonObject.name);

// const objectToConvert ={
//     name: "Alice",
//     age:25
// }
// const json=JSON.stringify(objectToConvert);
// console.log(json);
// console.log(typeof json)

// const express = require('express')

// const app = express();

// app.get('/', (req, res) => {
//   res.send('Welcome to my Hotel.... How i can help u? we have list of menus')
// })
// app.get('/chicken',(req,res)=>{
//     res.send('sure sir,i would love to serve chicken')
// })


// app.get('/idli',(req,res)=>{
//     var customized_idli={
//         name:'rava idli',
//         size:'10 cm diameter',
//         is_sambhar:true,
//         is_chutney:false,
//     }
//     res.send(customized_idli)
// })

// app.post('/items',(req,res)=>{
//   res.send('data is saved');
// })
//   app.listen(3000, () => {
//   console.log('Listening on port 3000');
// })

// const express = require('express');

// const app = express();
// const db = require('./db');

// const bodyParser = require('body-parser');
// app.use(bodyParser.json());

// // const Person = require('./models/person');
// const MenuItem = require('./models/MenuItem');


// app.get('/', (req, res) => {
//   res.send('Welcome to our Hotel');
// })

// app.post('/person', async (req, res) => {

//   try {
//     const data = req.body//Assuming the request body contains the person data
//     //Create a new Person document using the Mongoose model
//     const newPerson = new Person(data);

//     //Save  the new person to the database
//     const response = await newPerson.save();
//     console.log('data saved');
//     res.status(200).json(response);
//     //   if (error) {
//     //     console.log('Error saving person:', error);
//     //     res.status(500).json({ error: 'Internal server error' })
//     //   } else {
//     //     console.log('data saved successfully');
//     //     res.status(200).json(savedPerson);
//     //   }
//     // })
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// })

// //Get method to get the person
// app.get('/person', async (req, res) => {
//   try {
//     const data = await Person.find();
//     console.log('data fetched');
//     res.status(200).json(data);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// })

// app.post('/menu', async (req, res) => {
//   try {
//     const data = req.body
//     const newMenu = new MenuItem(data);
//     const response = await newMenu.save();
//     console.log('data saved');
//     res.status(200).json(response);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// })

// //Get method to get the Menu Items
// app.get('/menu', async (req, res) => {
//   try {
//     const data = await MenuItem.find();
//     console.log('data fetched');
//     res.status(200).json(data);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// })


// app.get('/person/:workType',async(req,res)=>{
//  try{
//   const workType=req.params.workType;
//   if(workType=='chef'||workType=='waiter'||workType=='manager'){

//     const response=await Person.find({work:workType});
//     console.log('response fetched');
//     res.status(200).json(response);
//   }else{
//     res.status(404).json({error:'Invalid work type'});
//   }
// }catch(err){
//  console.log(err);
//     res.status(500).json({ error: 'Internal Server Error' });
// }
// })
require('dotenv').config();
const express = require('express');

const app = express();
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

// const Person = require('./models/person');
const MenuItem = require('./models/MenuItem');


app.get('/', (req, res) => {
  res.send('Welcome to our Hotel');
})
//Import the router files
const personRoutes=require('./routes/personRoutes');
app.use('/person',personRoutes);
const menuItemRoutes=require('./routes/menuItemRoutes');
app.use('/menu',menuItemRoutes);

app.listen(3000, () => {
  console.log('Listening on port 3000');
})