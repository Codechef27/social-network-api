const router = require('express').Router();

const {
    getThoughts,
    getThoughtById,
    addThought,
    addReaction,
    updateThought,
    deleteThought,
    deleteReaction
} = require('../../controllers/thought-controller');

router
.route('/')
.get(getThoughts)
.post(addThought)

router
.route('/:thoughtId')
.get(getThoughtById)
.put(updateThought)

router
.route('/:userId/:thoughtId')
.delete(deleteThought)

router
.route('/:thoughtId/reactions')
.put(addReaction)

router
.route('./:thoughtId/:reactionId')
.delete(deleteReaction)

module.exports = router;