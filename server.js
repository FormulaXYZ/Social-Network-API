const express = require('express');
const { default: mongoose } = require('mongoose');
const db = require('./config/connection');
const routes = require('./routes');



const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(routes);


db.once('open', () => {

    app.listen(PORT, () => console.log(`connected to localhost:${PORT}`))
})