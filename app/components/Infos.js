import React from 'react';
import AddButton from '../components/AddButton'


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
                     switchToViz={this.props.switchToViz}
                     set_infos={this.props.set_infos}
                     addGym={this.props.addGym}/>
          )
      default:
        return null;
    }
  }
});

var InfosPanel = React.createClass({
  render: function() {
    return (
      <ul className="list-group">
        <li className="list-group-item"><span className="info-label">Name</span> {this.props.infos.name}</li>
        <li className="list-group-item"><span className="info-label">Price</span> {this.props.infos.price}</li>
      </ul>
      )
  }
});


var InfosForm = React.createClass({
  getInitialState() {
      return {
          data: {}  
      };
  },
  handleNameChange: function(e) {
    var data = this.state.data;
    data.name = e.target.value
    this.setState({
      data: data
    });
  },
  handlePriceChange: function(e) {
    var data = this.state.data;
    data.price = e.target.value
    this.setState({
      data: data
    });
  },
  componentWillReceiveProps: function(nextProps) {
    var data = this.state.data;
    data.coords = nextProps.new_gym_coord;
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
              <input className="form-control info-input" onChange={this.handleNameChange}></input>
            </li>
            <li className="list-group-item">
              <span className="info-label">Price</span>
              <input className="form-control info-input" onChange={this.handlePriceChange}></input>
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
      longitude: this.props.data.coords.lng,
      latitude: this.props.data.coords.lat      
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