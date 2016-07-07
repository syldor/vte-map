import React from 'react';
import AddButton from '../components/AddButton'


var CommentsList = React.createClass({
  render: function() {
    var hide_button = true;
    if(this.props.gid) {
      hide_button = false;
    }
    var language = this.props.language;
    return (
      <div>
        <ul className="list-group">
          {this.props.comments_list.filter((function(comment) {
            if(comment.language == language) {
              return comment;
            }
          }).bind(this)).map((comment, i) =>
            <li className="list-group-item" key={i}>{comment.content}</li>
          )}
        </ul>
        <AddButton onClick={this.props.switchToAddComment} hidden={hide_button}/>
      </div>
      )
  }
});

export default CommentsList