import React from 'react';
import AddButton from '../components/AddButton'
import InfosPanel from '../components/InfosPanel'


var Infos = React.createClass({
  render: function() {
    switch(this.props.mode) {
      case "VIZ":
        return (
          <div>
            <InfosPanel infos={this.props.selected_infos}/>
          </div>
      )
      case "ADD_COMMENT":
        return (
          <div>
            <InfosPanel infos={this.props.selected_infos}/>
          </div>
      )
      case "ADD":
        return (
          <InfosForm new_gym_coord={this.props.new_gym_coord}
                     new_gym_hours={this.props.new_gym_hours}
                     switchToViz={this.props.switchToViz}
                     set_infos={this.props.set_infos}
                     addGym={this.props.addGym}/>
          )
      default:
        return null;
    }
  }
});


var InfosForm = React.createClass({
  getInitialState() {
      return {
          data: {}  
      };
  },
  handleChange: function(e) {
    var name = e.target.name;
    var data = this.state.data;
    data[name] = e.target.value;
    this.setState({
      data: data
    });
  },
  componentWillReceiveProps: function(nextProps) {
    var data = this.state.data;
    data.coords = nextProps.new_gym_coord;
    data.new_gym_hours = nextProps.new_gym_hours;
    this.setState({
      data: data
    });
  },
  render: function() {
    return (
        <div>
          <ul className="list-group">
            <li className="list-group-item">
              <span className="info-label">Name</span>
              <input className="form-control info-input" name="name" onChange={this.handleChange}></input>
            </li>
            <li className="list-group-item">
              <span className="info-label">Price</span>
              <input className="form-control info-input" name="price" onChange={this.handleChange}></input>
            </li>
            <li className="list-group-item">
              <span className="info-label">Price 6 months</span>
              <input className="form-control info-input" name="price_6month" onChange={this.handleChange}></input>
            </li>
            <li className="list-group-item">
              <span className="info-label">Price 1 year</span>
              <input className="form-control info-input" name="price_year" onChange={this.handleChange}></input>
            </li>
            <li className="list-group-item">
              <span className="info-label">Infos</span>
              <textarea className="form-control info-input" name="infos" onChange={this.handleChange}></textarea>
            </li>
          </ul>
          <FormButtons switchToViz={this.props.switchToViz} 
                       data={this.state.data} 
                       set_infos={this.props.set_infos}
                       addGym={this.props.addGym}/>
        </div>
      )
  }
});

var FormButtons = React.createClass({
  submit: function() {
    var body = {
      name: this.props.data.name,
      price: this.props.data.price,
      price_6month: this.props.data.price_6month,
      price_year: this.props.data.price_year,
      infos: this.props.data.infos,
      longitude: this.props.data.coords.lng,
      latitude: this.props.data.coords.lat,
      new_gym_hours: this.props.data.new_gym_hours    
    }
    this.props.addGym(body);
  },
  render: function() {
    return (
      <div>
        <button className="btn btn-default" onClick={this.props.switchToViz}>Cancel</button>
        <button className="btn btn-success pull-right" onClick={this.submit}>Submit</button>
      </div>
      )
  }
});

export default Infos