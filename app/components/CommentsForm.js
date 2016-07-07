import React from 'react';
import AddButton from '../components/AddButton'


var CommentsForm = React.createClass({
  getInitialState: function() {
    return {
      content: ''
    }
  },
	handleContentChange: 	function(e) {
    var content = e.target.value;
		this.setState({
			content
		});
	},
  render: function() {
    return (
      <div>
        <textarea className="form-control" onChange={this.handleContentChange}></textarea>
        <FormButtons addComment={this.props.addComment} 
        						content={this.state.content} 
        						gid={this.props.gid} 
        						switchToViz={this.props.switchToViz}
                    language={this.props.language}/>
      </div>
      )
  }
});

var FormButtons = React.createClass({
  submit: function() {
    var body = {
      gym_id: this.props.gid,
      content: this.props.content,
      language: this.props.language      
    }
    this.props.addComment(body);
  },
  render: function() {
    return (
      <div>
        <button className="btn btn-default" onClick={this.props.switchToViz}>Cancel</button>
        <button className="btn btn-success pull-right" onClick={this.submit}>Submit</button>
      </div>
      )
  }
});


export default CommentsForm