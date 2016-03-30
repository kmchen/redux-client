import React    from 'react';
import ReactDOM from 'react-dom';
import {Route, Router, hashHistory}  from 'react-router'
import {createStore}  from 'redux';
import reducer  from './reducer';
import {Provider} from 'react-redux';
import io from 'socket.io-client';

import {VotingContainer}   from './components/Voting';
import {ResultsContainer}  from './components/Results';
import App      from './components/App';

const store = createStore(reducer);
store.dispatch({
  type: 'SET_STATE',
  state: {
    vote: {
      pair: ['movie one', 'movie two'],
      tally: {'movie one': 2}  
    }
  }
});

const socket = io(`${location.protocol}//${location.hostname}:8090`);

const routes = <Route component={App}>
  <Route path='/' component={VotingContainer}></Route>
  <Route path='/results' component={ResultsContainer}></Route>
  </Route>;

ReactDOM.render(
    <Provider store={store}>
      <Router history={hashHistory}>{routes}</Router>
    </Provider>,
    document.getElementById('app')
    );
