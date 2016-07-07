import React from 'react';
import translate from './translate';


var InfosPanel = React.createClass({
  formatTime: function(time) {
    if(time) {
      return time.substring(0, 5);
    }
    return time;
  },
  render: function() {
    var days_list = [1, 2, 3, 4, 5, 6, 7];
    var hours = [];
    if(this.props.infos.hours) {
      hours = this.props.infos.hours.sort((a, b) => a.day - b.day);
    }
    return (
      <div>
        <ul className="list-group">
          <li className="list-group-item"><span className="info-label">{this.props.strings["Name"]}</span> {this.props.infos.name}</li>
          <li className="list-group-item"><span className="info-label">{this.props.strings["Price"]}</span> {this.props.infos.price}</li>
          <li className="list-group-item"><span className="info-label">{this.props.strings["Price 6 months"]}</span> {this.props.infos.price_6month}</li>
          <li className="list-group-item"><span className="info-label">{this.props.strings["Price 1 year"]}</span> {this.props.infos.price_year}</li>
          <li className="list-group-item">{this.props.infos.infos}</li>
          <li className="list-group-item">
            <table className="table">
              <thead>
                <tr>
                  <td></td>
                  <td>{this.props.strings["Open"]}</td>
                  <td>{this.props.strings["Closed"]}</td>
                </tr>
              </thead>
              <tbody>
              {hours.map((function(hour) {
                return (
                      <tr key={hour.day}>
                        <td>{this.props.strings["day_" + hour.day]}</td>
                        <td>{this.formatTime(hour.time_open) || "-"}</td>
                        <td>{this.formatTime(hour.time_close) || "-"}</td>
                      </tr>
                  )
              }).bind(this))}
              </tbody>
            </table>
          </li>
        </ul>
      </div>
      )
  }
});

export default translate('InfosPanel')(InfosPanel)