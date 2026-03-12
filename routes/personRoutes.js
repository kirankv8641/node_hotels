const express = require('express');
const router = express.Router();
const Person = require('./../models/person');
const { jwtAuthMiddleware, generateToken } = require('./../jwt');

router.post('/signup', async (req, res) => {

    try {
        const data = req.body//Assuming the request body contains the person data

        //Create a new Person document using the Mongoose model
        const newPerson = new Person(data);

        //Save  the new person to the database
        const response = await newPerson.save();
        console.log('data saved');

        const payload = {
            id: response._id,
            username: response.username
        };
        console.log(JSON.stringify(payload));
        const token = generateToken(payload);
        console.log("Token is :", token);
        res.status(200).json({ response: response, token: token });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

//Login route
router.post('/login', async (req, res) => {
    try {
        //Extract the username and password from the request body
        const { username, password } = req.body;
        const user = await Person.findOne({ username: username });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        //generate a token
        const payload = {
            id: user.id,
            username: user.username
        }
        const token = generateToken(payload);

        res.json({ token })
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//Profile route
router.get('/profile', jwtAuthMiddleware,async (req, res) => {
    try {
        const userData = req.user;//Extract the user data from the request object
        console.log('User data:', userData);

        const userId = userData.id;
        const user = await Person.findById(userId);

        res.status(200).json({ user });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.get('/', jwtAuthMiddleware, async (req, res) => {
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