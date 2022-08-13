const { User, Thoughts } = require('../models');

const userController = {
  // get all users
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: ("thoughts", "friends"),
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbUser) => res.json(dbUser))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get users by id

  getUserById({ params }, res) {
    User.findOne({
      _id: params.id,
    })
      .populate({
        path: ("thoughts", "friends"),
        select: "-__v",
      })
      .select("-__v")
      .then((dbUser) => res.json(dbUser))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  createUsers({ body }, res) {
    User.create(body)
      .then((dbUser) => res.json(dbUser))
      .catch((err) => res.json(err));
  },

  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((dbUser) => {
        if (!dbUser) {
          res.status(404).json({ message: "No User found with this id!" });
          return;
        }
        res.json(dbUser);
      })
      .catch((err) => res.json(err));
  },

  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
    .then((dbUser) => {
      if(!dbUser){
        return res.status(404).json({ message: "No User found with this ID!" })
      }
        return Thoughts.deleteMany({ _id: { $in: dbUser.thoughts } })
  })
    .then(() => res.json({ message: "User and Thought's deleted!" }))
    .catch((err) => res.json(err));
},
  


  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUser) => {
        if (!dbUser) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUser);
      })
      .catch((err) => res.json(err));
  },

  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUser) => {
        if (!dbUser) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUser);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = userController