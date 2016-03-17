import React    from 'react';
import ReactDOM from 'react-dom';
import {Route, Router, hashHistory}  from 'react-router'

import Voting   from './components/Voting';
import Results  from './components/Results';
import App      from './components/App';

const winner = 'movie two';
const routes = <Route component={App}>
  <Route path='/' component={Voting}></Route>
  <Route path='/results' component={Results}></Route>
  </Route>;

ReactDOM.render(
    <Router history={hashHistory}>{routes}</Router>, 
    document.getElementById('app')
    );
