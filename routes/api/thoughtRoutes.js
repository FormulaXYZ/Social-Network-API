const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addThoughtResponse,
    removeThoughtResponse,
    addReact,
    removeReact,
} = require('../../controllers/thoughtController');
// /api/thought
router.route('/').get(getThoughts).post(createThought);
// /api/thoughts/:thoughtId
router
    .route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

// /api/thought/:thoughtId/react
router.route('/:thoughtId/responses').post(addThoughtResponse);

// /api/thoughts/:thoughtId/react/:reactId
router.route('/:thoughtId/responses/:responseId').delete(removeThoughtResponse);

router.route('/:thoughtId/response').post(addReact);

router.route('/:thoughtId/responses/:responseId').delete(removeReact);

module.exports = router;




