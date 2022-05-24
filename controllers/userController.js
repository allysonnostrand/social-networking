const { User, Thought, Reaction } = require('../models');

module.exports = {

    // Get all users
    getUsers(req, res) {
      User.find()
        .then(async (users) => {
          const userObj = {
            users
          };
          return res.json(userObj);
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },

    // Get a single user
    getSingleUser(req, res) {
      User.findOne({ _id: req.params.userId })
        .select('-__v')
        // .lean()
        .then(async (user) =>
          !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : res.json({
                user
              })
        )
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },

    // create a new user
    createUser(req, res) {
      User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },

    // Delete a user and remove their thoughts
    deleteUser(req, res) {
      User.findOneAndRemove({ _id: req.params.userId })
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No such user exists' })
            : Thought.findOneAndUpdate(
                { users: req.params.userId },
                { $pull: { users: req.params.userId } },
                { new: true }
              )
        )
        .then((thought) =>
          !thought
            ? res.status(404).json({
                message: 'User deleted, but no thoughts found',
              })
            : res.json({ message: 'User successfully deleted' })
        )
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
  
    // update a user
    updateUser(req, res) {
      console.log('You are updating a user');
      console.log(req.body);
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body},
        { new: true }
      )
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No user found with that ID :(' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    //add a friend
    addFriend(req, res) {
      console.log('You are adding a friend');
      console.log(req.body);
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.body.friendId } },
        { runValidators: true, new: true }
      )
        .then((friend) =>
          !friend
            ? res
                .status(404)
                .json({ message: 'No friend found with that ID :(' })
            : res.json(friend)
        )
        .catch((err) => res.status(500).json(err));
    },
   
    //delete a friend
    removeFriend(req, res) {
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId }  },
        { runValidators: true, new: true }
      )
        .then((friend) =>
          !friend
            ? res
                .status(404)
                .json({ message: 'No friend found with that ID :(' })
            : res.json(friend)
        )
        .catch((err) => res.status(500).json(err));
    },
}

