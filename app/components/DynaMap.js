import React from 'react';
require("leaflet_css");
require("leaflet_draw_css");
import L from 'leaflet';
import Draw from 'leaflet-draw';
L.Icon.Default.imagePath = "./images";

var DynaMap = React.createClass({
  componentDidMount: function() {
    var {onMarkerCreated} = this.props;
    var map = L.map("map").setView([17.96, 102.60], 12);
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    }).addTo(map);
    var db_gyms_layer = L.featureGroup().addTo(map);
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
    map.on('draw:created', (e => {
        var marker = e.layer;
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
        onMarkerCreated(e.layer.getLatLng())
    }).bind(this));

    map.on('draw:edited', (e => {
        var layers = e.layers;
        layers.eachLayer((function(layer) {
          this.setState({
            map: map,
            drawControl: drawControl,
            drawnItems: drawnItems
          });
        }).bind(this));
    }).bind(this));

    var drawControl = new L.Control.Draw(drawOptions);

    this.setState({db_gyms_layer, map, drawnItems, drawControl})
  },
  componentWillReceiveProps: function(nextProps) {
    var { onMarkerClick, markers, mode, onMarkerCreated } = nextProps;
    var {map, drawControl, drawnItems, db_gyms_layer} = this.state;

    if(markers) {
      db_gyms_layer.clearLayers();
      markers.forEach(function(gym) {
        L.marker([gym.latitude, gym.longitude], {infos: gym})
        .on('click', function(e) {
          onMarkerClick(e.target.options.infos);
        })
        .addTo(db_gyms_layer);
      });
      this.setState({db_gyms_layer});
    }
    if(this.props.mode != nextProps.mode) {
      if(nextProps.mode == 'ADD') {
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

        map.on('draw:created', (e => {
            var marker = e.layer;
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
            onMarkerCreated(e.layer.getLatLng())
        }).bind(this));

        map.on('draw:edited', (e => {
            var layers = e.layers;
            layers.eachLayer((function(layer) {
              this.setState({
                map: map,
                drawControl: drawControl,
                drawnItems: drawnItems
              });
            }).bind(this));
        }).bind(this));


        drawControl = new L.Control.Draw(drawOptions);
        map.addControl(drawControl);
        this.setState({
          map,
          drawControl,
          drawnItems
        });
      }
      else if(nextProps.mode == 'VIZ') {
        map.removeControl(drawControl);
        map.removeLayer(drawnItems);
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

export default DynaMap;