import React from 'react';

var AddButton = React.createClass({
  render: function() {
		var opts = {};
		if (this.props.disabled) {
		    opts['disabled'] = 'disabled';
		}
    return (
      <div>
        <button className="btn btn-primary" onClick={this.props.onClick} {...opts}>
          <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
        </button>
      </div>
      )
  }
});

export default AddButton