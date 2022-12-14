const { User, thought } = require('../models');

module.exports = {
    getThoughts(req, res) {
        thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) {
        thought.findOne({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // create a new thought
    createThought(req, res) {
        thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: thought._id } },
                    { new: true }
                );
            })
            .then((user) =>
                !user
                    ? res.status(404).json({
                        message: 'thought created, but found no user with that ID',
                    })
                    : res.json('Created the thought 🎉')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    updateThought(req, res) {
        thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : res.json(thought)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    deleteThought(req, res) {
        thought.findOneAndRemove({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : User.findOneAndUpdate(
                        { videos: req.params.thoughtId },
                        { $pull: { thoughts: req.params.thoughtId } },
                        { new: true }
                    )
            )
            .then((user) =>
                !user
                    ? res
                        .status(404)
                        .json({ message: 'thought created but no user with this id!' })
                    : res.json({ message: 'thought successfully deleted!' })
            )
            .catch((err) => res.status(500).json(err));
    },
    // Add a  response
    addThoughtResponse(req, res) {
        thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { responses: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Remove  response
    removeThoughtResponse(req, res) {
        thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { responseId: req.params.responseId } } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Add a  reaction to  a thought
    addReact(req, res) {
        console.log('You are adding a Raction');
        console.log(req.body);
        thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reacts: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) => {

                !thought
                    ? res
                        .status(404)
                        .json({ message: 'No thought found with that ID :(' })
                    : res.json(thought)
            })
            .catch((err) => res.status(500).json(err));
    },
    // Remove reaction fron a thought
    removeReact(req, res) {
        thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reacts: { reactId: req.params.reactId } } },
            { runValidators: true, new: true }
        )
            .then((thought) => {
                !thought
                    ? res
                        .status(404)
                        .json({ message: 'No react found with that ID :(' })
                    : res.json(thought)
            })
            .catch((err) => res.status(500).json(err));
    },
};