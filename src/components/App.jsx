import React  from 'react';
import {List, Map} from 'immutable';

export default React.createClass({
  render: function(){
            //return React.cloneElement(this.props.children,{pair: pair, tally: tally});
    return this.props.children;
  }
});
