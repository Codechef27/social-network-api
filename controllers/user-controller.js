const { User } = require('../models');

const userController = {
  // get all users
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: ('thoughts'), 
        select: '-__v',
      })
      .select('-__v')
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
      _id: params.id 
    })
    .populate({
      path: ('thoughts'),
      select: '-__v',
    })
    .select('-__v')
    .then((dbUser) => res.json(dbUser))
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
  },

  createUsers({ body }, res ) {
    User.create(body)
    .then((dbUser) => res.json(dbUser))
    .catch(err => res.json(err));
  },

  updateUser( { params, body }, res ){
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
    .then(dbUser => {
      if (!dbUser) {
        res.status(404).json({ message: 'No User found with this id!' });
        return;
      }
      res.json(dbUser);
    })
    .catch(err => res.json(err));
  }, 

  deleteUser({ params }, res ) {
    User.findOneAndDelete({
      _id: params.id
    })
    .then((dbUser) => res.json(dbUser))
    .catch(err => res.json(err));
  }
};

module.exports = userController