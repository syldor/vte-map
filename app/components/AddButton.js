import React from 'react';

var AddButton = React.createClass({
  render: function() {
  	var button = (
      <div>
        <button className="btn btn-primary" onClick={this.props.onClick}>
          <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
        </button>
      </div>
      )
		if (this.props.hidden) {
		    button = null
		}
    return button
  }
});

export default AddButton