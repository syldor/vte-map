import { connect } from 'react-redux'
import CommentsPanel from '../components/CommentsPanel'
import { switchToAddComment, addComment, switchToViz } from '../actions/actions'


const mapStateToProps = (state) => {
  return {
    comments_list: state.comments_list,
    mode: state.mode,
    gid: state.selected_infos.id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    switchToAddComment: () => {
      dispatch(switchToAddComment())
    },
    addComment: (body) => {
      dispatch(addComment(body))
    },
    switchToViz: () => {
      dispatch(switchToViz())
    }
  }
}

const CommentsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentsPanel)

export default CommentsContainer
