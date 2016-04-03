import {List, Map, fromJS}   from 'immutable'
import {expect} from 'chai'

import Reducer   from '../../src/reducer'

describe('Reducer', () => {
  it('handles SET_STATE', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE', 
      state : Map({
        vote: Map({
          pair: List.of('movie one', 'movie two'),
          tally: Map({'movie one': 1})
          }) 
      })
    }
    const nextState = Reducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['movie one', 'movie two'],
        tally: {'movie one': 1}
        }  
    }));
  });
  it('handles SET_STATE with plain JS payload', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE', 
      state : {
        vote: {
          pair: ['movie one', 'movie two'],
          tally: {'movie one': 1}
        }
      }
    }
    const nextState = Reducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['movie one', 'movie two'],
        tally: {'movie one': 1}
        }  
    }));
  });
  it('handles SET_STATE without initialState', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE', 
      state : {
        vote: {
          pair: ['movie one', 'movie two'],
          tally: {'movie one': 1}
        }
      }
    }
    const nextState = Reducer(undefined, action);
    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['movie one', 'movie two'],
        tally: {'movie one': 1}
        }  
    }));
  });
  it('handles VOTE by setting hasVoted', () => {
    const state = fromJS({
      vote: {
        pair: ['movie one', 'movie two'],
        tally: {'movie one': 1}
      }
    });
    const action = {type: 'VOTE', entry: 'movie one'};
    const nextState = Reducer(state, action);
    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['movie one', 'movie two'],
        tally: {'movie one': 1}
      },
      hasVoted: 'movie one'
    }));
  });
  it('doesn\'t set hasVoted for VOTE on invalid entry', () => {
    const state = fromJS({
      vote: {
        pair: ['movie one', 'movie two'],
        tally: {'movie one': 1}
      }
    });
    const action = {type: 'VOTE', entry: 'movie three'};
    const nextState = Reducer(state, action);
    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['movie one', 'movie two'],
        tally: {'movie one': 1}
      }
    }));
  });
  it('remove hasVoted as SET_STATE with a new pair', () => {
    const state = fromJS({
      vote: {
        pair: ['movie one', 'movie two'],
        tally: {'movie one': 1}
      },
      hasVoted: 'movie one'
    });
    const newState = fromJS({
        vote: {
          pair: ['movie three', 'movie four']
        }
    });
    const action = {type: 'SET_STATE', state : newState};
    const nextState = Reducer(state, action);
    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['movie three', 'movie four']
      }
    }));
  });
  //it('remove hasVoted as SET_STATE with if pair changes', () => {
    //const state = fromJS({
      //vote: {
        //pair: ['movie one', 'movie two'],
        //tally: {'movie one': 1}
      //},
      //hasVoted: 'movie one'
    //});
    //const newState = fromJS({
        //vote: {
          //pair: ['movie three', 'movie four']
        //}
    //});
    //const action = {type: 'SET_STATE', state : newState};
    //const nextState = Reducer(state, action);
    //expect(nextState).to.equal(fromJS({
      //vote: {
        //pair: ['movie three', 'movie four']
      //}
    //}));
  //});
});

