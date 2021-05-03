const { User, Thought } = require('../models')

const resolvers = {
  Query: {
    async thoughts(parent, { username }) {
      const params = username ? { username } : {};
      return Thought.find(params).sort({ createdAt: -1 });
    }
  }
};

module.exports = resolvers;