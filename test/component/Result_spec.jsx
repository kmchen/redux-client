import React    from 'react';
import ReactDom from 'react-dom';
import {List, Map}   from 'immutable'
import {renderIntoDocument,
        scryRenderedDOMComponentsWithClass,
        Simulate
} from 'react-addons-test-utils';

import Results   from '../../src/components/Results'
import Winner   from '../../src/components/Winner'
import {expect} from 'chai'

describe('Result', () => {
  it('renders entries with vote counts or zero', () => {
    const pair = List.of('movie one', 'movie two');
    const tally = Map({'movie one': 5});
    const component = renderIntoDocument(
      <Results pair={pair} tally={tally} />
    );
    const entries = scryRenderedDOMComponentsWithClass(component, 'entry');
    const [movie_one, movie_two] = entries.map(e => e.textContent)
    expect(movie_one).to.contain(pair.get(0));
    expect(movie_one).to.contain(tally.get(pair.get(0)));
    expect(movie_two).to.contain(pair.get(1));
    expect(movie_two).to.contain(0);
  });
  it('invokes the next callback when next button is clicked', () => {
    let nextInvoked = false; 
    const next = () => nextInvoked = true;
    const pair = List.of('movie one', 'movie two');
    const component = renderIntoDocument(
      <Results pair={pair} tally={Map()} next={next}/>
      );
    Simulate.click(ReactDom.findDOMNode(component.refs.next));
    expect(nextInvoked).to.equal(true);
  });
  it('displays winner', () => {
    let winner = 'movie one'; 
    const component = renderIntoDocument(
      <Results winner={winner} pair={['movie one', 'movie two']} tally={Map()}/>
      );
    const theWinner = ReactDom.findDOMNode(component.refs.winner)
    expect(theWinner).to.be.ok;
    expect(theWinner.textContent).to.contain('movie one');
  });
});
