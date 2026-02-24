const express = require('express');
const router = express.Router();
const Person = require('./../models/person');

router.post('/', async (req, res) => {

    try {
        const data = req.body//Assuming the request body contains the person data

        //Create a new Person document using the Mongoose model
        const newPerson = new Person(data);

        //Save  the new person to the database
        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;
        if (workType == 'chef' || workType == 'waiter' || workType == 'manager') {

            const response = await Person.find({ work: workType });
            console.log('response fetched');
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Invalid work type' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

//Update
router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id;//Extract the id from the url parameter
        const updatedPersonData = req.body;//updated data for the person

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            returnDocument: 'after',
            runValidators: true,
        })
        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }
        console.log('data uploaded');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

//Delete
router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;//Extract the id from the url parameter

        //Assuming u have a person model
        const response = await Person.findByIdAndDelete(personId);
        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }
        console.log('data deleted');
        res.status(200).json({ message: 'person deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
module.exports = router;