import { connect } from 'react-redux'
import { languages } from '../constants/Languages'
import { setLanguage } from '../actions/actions'
import React from 'react';

const mapStateToProps = (state) => {
  return {
    language: state.language
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLanguage: (language) => {
      console.log(language)
      dispatch(setLanguage(language))
    }
  }
}

var LanguageSelector = React.createClass({
  handleClick: function(e) {
    var language = e.currentTarget.name;
    this.props.setLanguage(language);
  },
  render: function() {
    var country_class = 'flag_' + this.props.language;
    var flag_class = 'flag';
    var classnames = [flag_class, country_class];
    return (
		<div className="dropdown language-dropdown">
      <a href="javascript:;" className="dropdown-toggle active-flag" id="languageDropdown" data-toggle="dropdown">
          <div className={classnames.join(' ')}></div>
      </a>
		  <ul className="dropdown-menu" aria-labelledby="languageDropdown">
		    <li><a href="#" name="en" data-value="en" onClick={this.handleClick}><div className="flag flag_en"></div></a></li>
		    <li><a href="#" name="la" data-value="la" onClick={this.handleClick}><div className="flag flag_la"></div></a></li>
		  </ul>
		</div>
    	)
  }
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LanguageSelector)