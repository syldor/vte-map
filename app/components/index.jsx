require("leaflet_css");
require("leaflet_draw_css");
require('bootstrap_css');
require("./styles.css");

import React from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';
import Draw from 'leaflet-draw';

//jquery required in webpack.config

L.Icon.Default.imagePath = "./images";

var Container = React.createClass({
  getInitialState: function() {
    return {
      selected_infos: {},
      add_mode: false,
      new_gym_coord: {},
      new_gym_infos: {}
    };
  },
  selectGym: function(infos) {
    this.setState({
      selected_infos: infos
    });
  }, 
  setNewGymCoord: function(coord) {
    this.setState({
      new_gym_coord: coord
    });
  },
  setNewGymInfos: function(infos) {
    this.setState({
      new_gym_infos: infos
    });
  },
  triggerAddMode: function() {
    this.setState({
      add_mode: !this.state.add_mode
    });
  },
  render: function() {
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
              <GymMap select={this.selectGym} 
                      set_coord={this.setNewGymCoord} 
                      source={this.props.source} 
                      add_mode={this.state.add_mode} 
                      new_gym_infos={this.state.new_gym_infos}/>
            </div>
            <div className="col-md-4">
              <div className="panel panel-default">
                <div className="panel-body">
                  <Infos infos={this.state.selected_infos} 
                         source={this.props.source} 
                         new_coords={this.state.new_gym_coord} 
                         set_infos={this.setNewGymInfos} 
                         add_mode={this.state.add_mode} 
                         triggerAddMode={this.triggerAddMode}/>
                  <AddButtonContainer triggerAddMode={this.triggerAddMode} 
                                      add_mode={this.state.add_mode}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )
  }
});


var GymMap = React.createClass({
  getInitialState: function() {
    return {
      lat: 17.96,
      lng: 102.60,
      zoom: 12,
    }
  },
  componentDidMount: function() {
    var selectGym = this.props.select;
    var map = L.map("map").setView([17.96, 102.60], 12);
    var db_gyms_layer = L.featureGroup().addTo(map);
    this.serverRequest = $.get(this.props.source + '/api', (function(gyms) {
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      }).addTo(map);
      gyms.forEach(function(gym, i) {
        L.marker([gym.latitude, gym.longitude], {infos: gym})
        .on('click', function(e) {
          selectGym(e.target.options.infos);
        })
        .addTo(db_gyms_layer);
      });
      this.setState({
        map: map,
        db_gyms_layer: db_gyms_layer
      });
    }).bind(this));
  },
  componentWillUnmount: function() {
    this.serverRequest.abort();
  },
  componentWillReceiveProps: function(nextProps) {
    if(this.props.add_mode != nextProps.add_mode) {
      var map = this.state.map;
      if(nextProps.add_mode) {
        var drawnItems = new L.FeatureGroup();
        map.addLayer(drawnItems);

        var drawOptions = {
          draw: {
            polyline: false,
            polygon: false,
            circle: false,
            marker: true,
            rectangle: false
          },
          edit: {
            featureGroup: drawnItems,
            remove: false
          }
        }

        var drawControl = new L.Control.Draw(drawOptions);
        map.addControl(drawControl);

        this.setState({
          drawControl: drawControl
        });

        map.on('draw:created', (function (e) {
            var marker = e.layer;
            this.props.set_coord({
              lat: e.layer.getLatLng().lat,
              lng: e.layer.getLatLng().lng
            });
            drawnItems.addLayer(marker);
            map.removeControl(this.state.drawControl);
            drawOptions.draw.marker = false;
            drawControl = new L.Control.Draw(drawOptions);
            map.addControl(drawControl);
            this.setState({
              map: map,
              drawControl: drawControl,
              drawnItems: drawnItems
            });
        }).bind(this));

        map.on('draw:edited', (function (e) {
            var layers = e.layers;
            layers.eachLayer((function(layer) {
              this.props.set_coord({
                lat: layer.getLatLng().lat,
                lng: layer.getLatLng().lng
              });
              this.setState({
                map: map,
                drawControl: drawControl,
                drawnItems: drawnItems
              });
            }).bind(this));
        }).bind(this));

        this.setState({
          map: map,
          drawnItems: drawnItems
        });
      }
      else {
        var db_gyms_layer = this.state.db_gyms_layer;
        var selectGym = nextProps.select;
        this.state.drawnItems.eachLayer((function(layer) {
          var marker = L.marker(layer.getLatLng(), {infos: nextProps.new_gym_infos})
                      .on('click', function(e) {
                        selectGym(e.target.options.infos);
                      });
          db_gyms_layer.addLayer(marker);
        }).bind(this));
        map.removeControl(this.state.drawControl);
        map.removeLayer(this.state.drawnItems);
      }
    }
  },
  render: function() {
    return (
        <div className="panel panel-default">
          <div className="panel-body">
            <div id="map">
            </div>
          </div>
        </div>
    );
  }
});

var Infos = React.createClass({
  render: function() {
    var infos = (this.props.add_mode) ? <InfosForm source={this.props.source} 
                                                   new_coords={this.props.new_coords} 
                                                   triggerAddMode={this.props.triggerAddMode}
                                                   set_infos={this.props.set_infos}/> : <InfosPanel infos={this.props.infos}/>
    return (
      <div>
        {infos}
      </div>
      )
  }
});

var InfosPanel = React.createClass({
  render: function() {
    return (
        <ul className="list-group">
          <li className="list-group-item"><span className="info-label">Name</span> {this.props.infos.name}</li>
          <li className="list-group-item"><span className="info-label">Price</span> {this.props.infos.price}</li>
        </ul>
    );
  }
});

var AddButtonContainer = React.createClass({
  render: function() {
    var button = (!this.props.add_mode) ? <AddButton triggerAddMode={this.props.triggerAddMode}/> : null;
    return (
        button
      )
  }
});

var AddButton = React.createClass({
  render: function() {
    return (
      <div>
        <button className="btn btn-primary" onClick={this.props.triggerAddMode}>
          <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
        </button>
      </div>
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
    data.coords = nextProps.new_coords;
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
              <input class="form-control info-input" onChange={this.handleNameChange}></input>
            </li>
            <li className="list-group-item">
              <span className="info-label">Price</span>
              <input class="form-control info-input" onChange={this.handlePriceChange}></input>
            </li>
          </ul>
          <FormButtons triggerAddMode={this.props.triggerAddMode} 
                       data={this.state.data} 
                       source={this.props.source} 
                       set_infos={this.props.set_infos}/>
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
    this.props.triggerAddMode();
    this.props.set_infos(body);
    $.ajax({
      url: this.props.source + '/api',
      type: 'POST',
      contentType:'application/json',
      data: JSON.stringify(body),
      dataType:'json'
    });
  },
  render: function() {
    return (
      <div>
        <button className="btn btn-default" onClick={this.props.triggerAddMode}>Cancel</button>
        <button className="btn btn-success pull-right" onClick={this.submit}>Submit</button>
      </div>
      )
  }
});

ReactDOM.render(<Container source="http://localhost:3000"/>, document.getElementById('container'));
