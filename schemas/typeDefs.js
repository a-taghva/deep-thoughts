// import the gql tagged template function
// const { gql } = require('apollo-server-express');
import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Query {
    helloWorld: String
  }
`;

export default typeDefs;