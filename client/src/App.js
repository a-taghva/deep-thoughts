import React from 'react';

// special type of react component, use to provide data to all of other components
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import SingleThought from './pages/SingleThought';
import Profile from './pages/Profile';
import Signup from './pages/Signup';

import Home from './pages/Home';

// establish a new connection to the GraphQL server using Apollo
// uniform resources identifier
const client = new ApolloClient({
  uri: '/graphql'
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className='flex-column justify-flex-start min-100-vh'>
          <Header />
          <div className='container'>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/thought" component={SingleThought} />
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
