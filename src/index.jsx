import React from 'react';
import ReactDOM from 'react-dom';
import Voting from './components/Voting';

const pair = ['movie one', 'movie two'];

ReactDOM.render(
    <Voting pair={pair}/>,
    document.getElementById('app')
);
