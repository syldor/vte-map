import { default as React } from 'react';
import { connect } from 'react-redux'
import en from '../i18n/en';
import la from '../i18n/la';

const languages = {
    en,
    la
};

export default function translate(key) {
    return Component => {

        const mapStateToProps = (state) => {
          return {
            language: state.language
          }
        }

        var TranslationComponent = React.createClass({
            render: function() {
                var language = this.props.language;
                var strings = languages[language][key];
                return <Component {...this.props} {...this.state} strings={strings} />;
            }
        });
        return connect(
          mapStateToProps
        )(TranslationComponent);
    };
}