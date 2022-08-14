const { Thoughts , User } = require('../models');

const thoughtController = {
  getThoughts(req, res) {
    Thoughts.find({})
    .populate({
      path: 'userName', 
      select: ('-__v')
    })
    .select('-__v')
    .sort({ _id: -1 })
    .then((dbThought) => res.json(dbThought))
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
  }, 

  getThoughtById({ params }, res){
    Thoughts.findOne({
        _id: params.thoughtId 
      })
      .populate({
        path: ('userName'),
        select:('-__v')
      })
      .select('-__v')
      .then((dbThought) => res.json(dbThought))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });

  },
  addThought({ body }, res) {
    Thoughts.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { userName: body.userName },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbUser) => {
        if (!dbUser) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUser);
      })
      .catch((err) => res.json(err));
  },

  updateThought({ params, body }, res) {
    Thoughts.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true })
    .then((dbThoughts) => {
      if (!dbThoughts) {
        res.status(404).json({ message: "No thoughts found with this id!" });
        return;
      }
      res.json(dbThoughts);
    })
    .catch((err) => res.json(err));
  },

  deleteThought({ params }, res) {
    Thoughts.findOneAndDelete({ _id: params.thoughtId })
      .then((deletedThought) => {
        if (!deletedThought) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
        }
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { thoughts: params.thoughtId } },
          { new: true }
        );
      })
      .then((dbUser) => {
        if (!dbUser) {
          res.status(404).json({ message: 'No user found with this to remove this thought!' });
          return;
        }
        res.json(dbUser);
      })
      .catch((err) => res.json(err));
  },
  
  addReaction( { params, body }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true }
    )
      .then((dbThought) => {
        if (!dbThought) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThought);
      })
      .catch((err) => res.json(err));
  },

    deleteReaction({ params }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { _id: params.reactionId } } },
      { new: true }
    )
      .then(dbThought => res.json(dbThought))
      .catch(err => res.json(err));
  } 
};

module.exports = thoughtController;