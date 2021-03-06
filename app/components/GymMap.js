import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux'
import DynaMap from '../components/DynaMap'
import {fetchGyms, displayGymInfos, updateNewGymCoord, fetchComments} from '../actions/actions.js'

const mapStateToProps = (state) => {
  return {
    gyms: state.gyms,
    mode: state.mode
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    onMarkerClick: (infos) => {
      dispatch(displayGymInfos(infos));
      dispatch(fetchComments(infos.id));
    },
    onMapClick: () => {
      dispatch(displayGymInfos({}));
      dispatch(fetchComments());
    },
    onMarkerCreated: (coord) => {
      dispatch(updateNewGymCoord(coord));
    },
    getGyms: () => {
      dispatch(fetchGyms());
    }
  }
}

var GymMap = React.createClass({
  componentDidMount: function() {
    const { getGyms } = this.props;
    getGyms();
  },
  render: function() {
    return <DynaMap markers={this.props.gyms} 
                    onMarkerClick={this.props.onMarkerClick} 
                    onMarkerCreated={this.props.onMarkerCreated}
                    onMapClick={this.props.onMapClick}
                    mode={this.props.mode}/>
  }
})

export default connect(
          mapStateToProps,
          mapDispatchToProps
        )(GymMap)