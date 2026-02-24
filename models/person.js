 const mongoose=require('mongoose');

 //Define the person schema
 const personSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true//parameter-want a mandatory field
    },
    age:{
        type:Number
    },
    work:{
        type:String,
        enum:['chef','waiter','manager'],
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true//it checks people are not writing the same email
    },
    address:{
        type:String
    },
    salary:{
        type:Number,
        required:true
    }
 });

 //Create Person model
 const Person=mongoose.model('Person',personSchema);
 module.exports=Person;