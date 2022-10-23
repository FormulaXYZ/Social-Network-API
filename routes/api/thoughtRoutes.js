const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addThoughtResponse,
    removeThoughtResponse,
} = require('../../controllers/videoController');
// /api/thought
router.route('/').get(getThought).post(createThought);




