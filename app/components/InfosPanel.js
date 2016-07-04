import React from 'react';
import translate from './translate';


var InfosPanel = React.createClass({
  render: function() {
    return (
      <ul className="list-group">
        <li className="list-group-item"><span className="info-label">{this.props.strings["Name"]}</span> {this.props.infos.name}</li>
        <li className="list-group-item"><span className="info-label">{this.props.strings["Price"]}</span> {this.props.infos.price}</li>
        <li className="list-group-item"><span className="info-label">{this.props.strings["Price 6 months"]}</span> {this.props.infos.price_6month}</li>
        <li className="list-group-item"><span className="info-label">{this.props.strings["Price 1 year"]}</span> {this.props.infos.price_year}</li>
        <li className="list-group-item">{this.props.infos.infos}</li>
      </ul>
      )
  }
});

export default translate('InfosPanel')(InfosPanel)