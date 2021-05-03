const { User, Thought } = require('../models')

const resolvers = {
  Query: {
    async thoughts() {
      return Thought.find().sort({ createdAt: -1 })
    }
  }
};

module.exports = resolvers;