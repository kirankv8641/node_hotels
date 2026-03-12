const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Define the person schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true//parameter-want a mandatory field
    },
    age: {
        type: Number
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true//it checks people are not writing the same email
    },
    address: {
        type: String
    },
    salary: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

personSchema.pre('save', async function() {
    const person = this;

    //Hash the password only if it has been modified (or is new)
    if (!person.isModified('password')) return ;
    try {
        //hash password generation
        const salt = await bcrypt.genSalt(10);

        //hash password
        const hashPassword = await bcrypt.hash(person.password, salt);

        //replace the plain text password with the hashed one
        person.password = hashPassword;
    } catch (err) {
        console.log('BCRYPT ERROR:', err);
        throw err;
    }
});

personSchema.methods.comparePassword=async function(candidatePassword){
    try{
        const isMatch=await bcrypt.compare(candidatePassword,this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
}
//Create Person model
const Person = mongoose.model('Person', personSchema);
module.exports = Person;