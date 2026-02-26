const mongoose = require('mongoose');

// Use the environment variable `MONGO_URI` if provided (recommended),
// otherwise fall back to a local MongoDB instance for development.
const mongoURL = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/node_tutorial';

mongoose.connect(mongoURL)
   .then(() => console.log('MongoDB Connected'))
   .catch(err => console.error('MongoDB connection error:', err));

const db = mongoose.connection;

// Event listeners for connection state
db.on('connected', () => {
   console.log('Connected to MongoDB server');
});

db.on('error', (err) => {
   console.error('MongoDB connection error:', err);
});

db.on('disconnected', () => {
   console.log('MongoDB disconnected');
});

module.exports = db;