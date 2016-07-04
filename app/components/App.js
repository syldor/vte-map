import React from 'react';
import GymMap from '../components/GymMap'
import InfosSection from '../components/InfosSection'
import AddButton from '../components/AddButton'
import CommentsContainer from '../components/CommentsContainer'
import LanguageSelector from '../components/LanguageSelector'
import { connect } from 'react-redux'
import { switchToAdd } from '../actions/actions'




const mapDispatchToProps = (dispatch) => {
  return {
    switchToAdd: () => {
      dispatch(switchToAdd())
    }
  }
}

const mapStateToProps = (state) => {
  return {
    mode: state.mode
  }
}


var App = React.createClass({
  render: function() {
    var add_button_hidden = true;
    if(this.props.mode == 'VIZ') {
      add_button_hidden = false;
    }
    return (
      <div>
        <div className="navbar navbar-default">
            <div className="navbar-header">
                <a className="navbar-brand" href="#">Home</a>
            </div>
            <LanguageSelector/>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <GymMap/>
            </div>
            <div className="col-md-4">
              <div className="row">
                <div className="panel panel-default">
                  <div className="panel-body">
                    <InfosSection/>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h3 className="panel-title">Comments</h3>
                  </div>
                  <div className="panel-body">
                    <CommentsContainer/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8">
              <AddButton onClick={this.props.switchToAdd} hidden={add_button_hidden}/>
            </div>
          </div>
        </div>
      </div>
      )
  }
});

export default connect(
          mapStateToProps,
          mapDispatchToProps
        )(App)
