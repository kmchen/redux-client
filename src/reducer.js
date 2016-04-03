import {List, Map} from 'immutable';

function setState(state, newState){
  return state.merge(newState);
}

function setVote(state, entry){
  let pair = state.getIn(['vote', 'pair']);
  if (pair.includes(entry)) {
    return state.set('hasVoted',entry)
  }
  return state
}

function removeHasVoted(mergedState) {
  const hasVoted = mergedState.get('hasVoted');
  if (hasVoted && !mergedState.includes('hasVoted')) {
    return mergedState.delete('hasVoted') 
  }
  return mergedState
}

function vote(state, entry){
  const currentPair = state.getIn(['vote', 'pair']);
  if (currentPair && currentPair.includes(entry)){
    return state.set('hasVoted', entry);
  }
  return state;
}

export default function reducer(state = Map(), action) {
  switch(action.type) {
    case 'SET_STATE' :
      return removeHasVoted(setState(state, action.state))
    case 'VOTE' :
      return vote(state, action.entry)
  }
  return state;
}

