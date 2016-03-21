import React  from 'react';
import {List, Map} from 'immutable';

const pair = List.of('movie one', 'movie two');
const tally = Map({'movie one': 3, 'movie two': 2});

export default React.createClass({
  render: function(){
            return React.cloneElement(this.props.children,{pair: pair, tally: tally});
          }
});
