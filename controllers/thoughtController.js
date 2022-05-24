const { User, Thought, Reaction } = require('../models');

module.exports = {

    // Get all thoughts
    getThoughts(req, res) {
      Thought.find()
        .then(async (thoughts) => {
          const thoughtObj = {
            thoughts
          };
          return res.json(thoughtObj);
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },

    // Get a single thought
    getSingleThought(req, res) {
      Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        // .lean()
        .then(async (thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.json({
                thought
              })
        )
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },

    // create a new thought
    createThought(req, res) {
      Thought.create(req.body)
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    },

    // Delete a thought and remove their thoughts
    deleteThought(req, res) {
      Thought.findOneAndRemove({ _id: req.params.thoughtId })
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No such thought exists' })
            : Thought.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
              )
        )
        .then((thought) =>
          !thought
            ? res.status(404).json({
                message: 'Thought deleted, but no thoughts found',
              })
            : res.json({ message: 'Thought successfully deleted' })
        )
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
  
    // update a thought
    updateThought(req, res) {
      console.log('You are updating a thought');
      console.log(req.body);
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body},
        { new: true }
      )
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought found with that ID :(' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    //add a reaction
    addReaction(req, res) {
      console.log('You are adding a reaction');
      console.log(req.body);
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body.reactionId } },
        { runValidators: true, new: true }
      )
        .then((reaction) =>
          !reaction
            ? res
                .status(404)
                .json({ message: 'No reaction found with that ID :(' })
            : res.json(reaction)
        )
        .catch((err) => res.status(500).json(err));
    },
   
    //delete a reaction
    removeReaction(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: req.params.reactionId }  },
        { runValidators: true, new: true }
      )
        .then((reaction) =>
          !reaction
            ? res
                .status(404)
                .json({ message: 'No reaction found with that ID :(' })
            : res.json(reaction)
        )
        .catch((err) => res.status(500).json(err));
    },
}

