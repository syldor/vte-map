import React from 'react';
import CommentsList from '../components/CommentsList'
import CommentsForm from '../components/CommentsForm'


var CommentsPanel = React.createClass({
  render: function() {
    switch(this.props.mode) {
      case "ADD_COMMENT":
        return (
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">{this.props.strings["Comments"]}</h3>
            </div>
            <div className="panel-body">
              <CommentsForm addComment={this.props.addComment} 
                            gid={this.props.gid}
                            switchToViz={this.props.switchToViz}
                            language={this.props.language}/>;
            </div>
          </div>
          )
      case "ADD":
        return null;
      default:
        return (
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">{this.props.strings["Comments"]}</h3>
            </div>
            <div className="panel-body">
              <CommentsList comments_list={this.props.comments_list} 
                            gid={this.props.gid} 
                            switchToAddComment={this.props.switchToAddComment}
                            language={this.props.language}/>
            </div>
          </div>
          )
    }
  }
});

export default CommentsPanel