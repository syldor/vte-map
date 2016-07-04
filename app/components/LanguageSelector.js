import { connect } from 'react-redux'
import { languages } from '../constants/Languages'
import React from 'react';

const mapStateToProps = (state) => {
  return {
    language: state.language
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLanguage: () => {
      dispatch(switchToAdd())
    }
  }
}

var LanguageSelector = React.createClass({
  render: function() {
    return (
		<div className="dropdown">
		  <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
		    Dropdown
		    <span className="caret"></span>
		  </button>
		  <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
		    <li><a href="#">Action</a></li>
		    <li><a href="#">Another action</a></li>
		  </ul>
		</div>
    	)
  }
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LanguageSelector)