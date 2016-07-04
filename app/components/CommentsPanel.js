import React from 'react';
import CommentsList from '../components/CommentsList'
import CommentsForm from '../components/CommentsForm'


var CommentsPanel = React.createClass({
  render: function() {
    switch(this.props.mode) {
      case "ADD_COMMENT":
        return <CommentsForm addComment={this.props.addComment} 
                              gid={this.props.gid}
                              switchToViz={this.props.switchToViz}/>;
      default:
        return <CommentsList comments_list={this.props.comments_list} 
                            gid={this.props.gid} 
                            switchToAddComment={this.props.switchToAddComment}/>;
    }
  }
});

export default CommentsPanel