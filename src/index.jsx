import React from 'react';
import ReactDOM from 'react-dom';
import Voting from './components/Voting';

const pair = ['movie one', 'movie two'];

const winner = 'movie two';

ReactDOM.render(
    <Voting pair={pair} winner={winner} hasVoted='movie one'/>,
    document.getElementById('app')
);
