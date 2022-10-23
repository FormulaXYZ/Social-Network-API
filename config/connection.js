const { connect, connection } = require('mongoose');

connect('mongodb://localhost/thoughtsUsers', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = connection;
