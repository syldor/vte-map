import React from 'react';
import GymMap from '../components/GymMap'
import InfosSection from '../components/InfosSection'
import AddButton from '../components/AddButton'
import CommentsContainer from '../components/CommentsContainer'
import LanguageSelector from '../components/LanguageSelector'
import HoursFormContainer from '../components/HoursFormContainer'
import { connect } from 'react-redux'
import { switchToAdd } from '../actions/actions'
import translate from './translate';




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
    var hoursComponent;
    var AddButtonComponent;
    if(this.props.mode == 'VIZ') {
      AddButtonComponent = <AddButton onClick={this.props.switchToAdd}/>
    }
    if(this.props.mode == 'ADD') {
      hoursComponent = <HoursFormContainer/>
    }
    return (
      <div>
        <div className="navbar navbar-default">
            <div className="navbar-header">
                <a className="navbar-brand" href="#">{this.props.strings["Home"]}</a>
            </div>
            <LanguageSelector/>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <GymMap/>
              {AddButtonComponent}
              {hoursComponent}
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
                <CommentsContainer/>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      )
  }
});

export default translate('App')(connect(
          mapStateToProps,
          mapDispatchToProps
        )(App))
