const router = require('express').Router();

const {
    getThoughts,
    getThoughtById,
    addThought,
    addReaction,
    deleteThought,
    deleteReaction
} = require('../../controllers/thought-controller');

router
.route('/')
.get(getThoughts)
.post(addThought)

router
.route('/:id')
.get(getThoughtById)

// router
// .route('/:userId')
// .post(addThought)

router
.route('/:thoughtId')
.put(addReaction)
.delete(deleteThought)

router
.route('./:thoughtId/:reactionId')
.delete(deleteReaction)

module.exports = router;