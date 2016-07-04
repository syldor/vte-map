import { default as React } from 'react';
import en from '../i18n/en';

const languages = {
    en
};

export default function translate(key) {
    return Component => {
        var TranslationComponent = React.createClass({
            render: function() {
                var strings = languages['en'][key];
                return <Component {...this.props} {...this.state} strings={strings} />;
            }
        });
        return TranslationComponent;
    };
}