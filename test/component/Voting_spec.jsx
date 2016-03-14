import React    from 'react';
import ReactDom from 'react-dom';
import {renderIntoDocument,
        scryRenderedDOMComponentsWithTag,
        Simulate
} from 'react-addons-test-utils';

import Voting   from '../../src/components/Voting'
import {expect} from 'chai'

describe('Voting', () => {
  it('renders a pair of buttons', () => {

    //let callBack = (entry) => {};

    const component = renderIntoDocument(
      <Voting pair={['movie one', 'movie two']} />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    expect(buttons.length).to.equal(2);
    expect(buttons[0].textContent).to.equal('movie one');
    expect(buttons[1].textContent).to.equal('movie two');
  })
  it('invokes callback when button is clicked', () => {
    let value
    let onClick = (entry) => value = entry;
    const component = renderIntoDocument(
      <Voting pair={['movie one', 'movie two']} onClick={onClick}/>
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    Simulate.click(buttons[0])
    expect(value).to.equal('movie one');
  });
});
