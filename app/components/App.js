import React from 'react';
import GymMap from '../components/GymMap'
import InfosSection from '../components/InfosSection'
import AddButton from '../components/AddButton'
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
    var add_button_disabled = true;
    if(this.props.mode == 'VIZ') {
      add_button_disabled = false;
    }
    return (
      <div>
        <div className="navbar navbar-default">
            <div className="navbar-header">
                <a className="navbar-brand" href="#">Home</a>
            </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <GymMap/>
            </div>
            <div className="col-md-4">
              <div className="panel panel-default">
                <div className="panel-body">
                  <InfosSection/>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8">
              <AddButton onClick={this.props.switchToAdd} disabled={add_button_disabled}/>
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
