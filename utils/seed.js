const connection = require('../config/connection');
const { User, thought } = require('../models');
const { getRandomName, getRandomThought } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    await thought.deleteMany({});
    await User.deleteMany({});
