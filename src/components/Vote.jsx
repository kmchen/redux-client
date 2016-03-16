import React from 'react';

export default React.createClass({
  getPair: function(){
    return this.props.pair || [];
  },
  isDisabled: function(){
    return !!this.props.hasVoted;             
  },
  hasVotedFor: function(){
    return this.props.hasVoted === entry;              
  },
  render: function(){
    return <div className='voting'>
    { this.getPair().map(entry =>
          <button key={entry}
                  disabled={this.isDisabled()}
                  onClick={() => this.props.onClick(entry)}>
            <h1>{entry}</h1>
            {this.hasVotedFor(entry)? <div className='label'>Voted</div>:null}
          </button>
          )}
    </div>
    }
});

