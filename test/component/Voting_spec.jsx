import React    from 'react';
import ReactDom from 'react-dom';
import {List}   from 'immutable'
import {renderIntoDocument,
        scryRenderedDOMComponentsWithTag,
        Simulate
} from 'react-addons-test-utils';

import Voting   from '../../src/components/Voting'
import {expect} from 'chai'

describe('Voting', () => {
  it('renders a pair of buttons', () => {
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
  it('check button NOT disabled', () => {
    const component = renderIntoDocument(<Voting pair={['movie one', 'movie two']} />);
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    expect(buttons.length).to.equal(2);
    expect(buttons[0].disabled).to.equal(false);
    expect(buttons[1].disabled).to.equal(false);
  });
  it('check disabled and labeled button', () => {
    const component = renderIntoDocument(<Voting pair={['movie one', 'movie two']} hasVoted={'movie one'}/>);
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    expect(buttons.length).to.equal(2);
    // Check disability
    expect(buttons[0].disabled).to.equal(true);
    expect(buttons[1].disabled).to.equal(true);
    // Check labeled button
    expect(buttons[0].textContent).to.contain('Voted');
  });
  it('check winner', () => {
    const component = renderIntoDocument(<Voting winner={['movie one']}/>);
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    const winner = ReactDom.findDOMNode(component.refs.winner);
    expect(buttons.length).to.equal(0);
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('Winner is movie one');
  });
  it('renders as a pure component', () => {
    const pair = ['movie one', 'movie two'];
    const container = document.createElement('div');
    const component = ReactDom.render(<Voting pair={pair} />, container);
    const firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0]
    pair[0] = 'movie three';
    expect(firstButton.textContent).to.equal('movie one')
  });
  it('Update DOM when props changes', () => {
    const pair = ['movie one', 'movie two'];
    const container = document.createElement('div');
    let component = ReactDom.render(<Voting pair={pair} />, container);
    let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0]
    pair[0] = 'movie three';
    expect(firstButton.textContent).to.equal('movie one')
    // Update props with new data
    let newPair = List.of('movie three', 'movie four');
    component = ReactDom.render(<Voting pair={newPair} />, container);
    firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0]
    expect(firstButton.textContent).to.equal('movie three')
  });
});
