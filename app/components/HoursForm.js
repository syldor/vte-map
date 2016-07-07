import React from 'react';
import translate from './translate';


var HoursForm = React.createClass({
	getInitialState: function() {
		var days_list = [1, 2, 3, 4, 5, 6, 7];
		var new_gym_hours = [];
		var initialStates = {};
		days_list.map(function(day) {
			var hourObject = {};
			hourObject["hourOpen_" + day] = 10;
			hourObject["minOpen_" + day] = 1;
			hourObject["hourClose_" + day] = 2;
			hourObject["minClose_" + day] = 3;
			Object.assign(initialStates, hourObject);
			new_gym_hours.push({
				day: day,
				time_open: hourObject["hourOpen_" + day] + ':' + hourObject["minOpen_" + day],
				time_close: hourObject["hourClose_" + day] + ':' + hourObject["minClose_" + day],
				holiday: false
			});
		});

		Object.assign(initialStates, {
			hourOpen_touched: false,
			hourClose_touched: false,
			minOpen_touched: false,
			minClose_touched: false,
			new_gym_hours
		});
		return initialStates;
	},
	getDay: function(day_nb) {
		var days_names = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
		return days_names[day_nb - 1];
	},
	onSelectorChange: function(e) {
		var days_list = [1, 2, 3, 4, 5, 6, 7];
		var prefix = e.target.name.split("_")[0];
		var day = parseInt(e.target.name.split("_")[1]);
		if(!(this.state[prefix + "_touched"])) {
			var new_state = {};
			days_list.map((function(day) {
				new_state[prefix + "_" + day] = e.target.value;
			}).bind(this));
			new_state[prefix + "_touched"] = true;
			this.setState(new_state, (function() {
				days_list.map((function(day) {
					this.updateNewHours(day, false);
				}).bind(this));
			}).bind(this));
		}
		else {
			var new_state = {};
			new_state[e.target.name] = e.target.value;
			this.setState(new_state, (function() {
				this.updateNewHours(day, false);
			}).bind(this));
		}
	},
	updateNewHours: function(day, update_holiday) {
		var new_gym_hours = this.state.new_gym_hours;
		if(update_holiday) {
			new_gym_hours.forEach((function(new_gym_hour) {
				if(new_gym_hour.day == day) {
					if(this.state["closeCheckbox_" + day]) {
						new_gym_hour.holiday = true;
						new_gym_hour.time_open = null;
						new_gym_hour.time_close = null;
					}
					else {
						new_gym_hour.holiday = false;
						new_gym_hour.time_open = this.state["hourOpen_" + day] + ":" + this.state["minOpen_" + day];
						new_gym_hour.time_close = this.state["hourClose_" + day] + ":" + this.state["minClose_" + day];
					}
				}
			}).bind(this));
		}
		else {
			var new_time_open = this.state["hourOpen_" + day] + ":" + this.state["minOpen_" + day];
			var new_time_close = this.state["hourClose_" + day] + ":" + this.state["minClose_" + day];
			new_time_open["hourOpen_" + day] 
			new_gym_hours.forEach((function(new_gym_hour) {
				if(new_gym_hour.day == day) {
					new_gym_hour.time_open = new_time_open;
					new_gym_hour.time_close = new_time_close;
				}
			}).bind(this));
		}
		var updateNewGymHours = this.props.updateNewGymHours;
		this.setState({
			new_gym_hours
		}, function() {
			updateNewGymHours(this.state.new_gym_hours);
		});
	},
	onCheckboxChange: function(e) {
		var new_state = {};
		new_state[e.target.name] = e.target.checked;
		var day = parseInt(e.target.name.split("_")[1]);
		var updateNewHours = this.updateNewHours;
		this.setState(new_state, function() {
			this.updateNewHours(day, true);
		});
	},
	render: function() {
		var days_list = [1, 2, 3, 4, 5, 6, 7];

		var hours_list = [];
		for (var i = 0 ; i < 25; i++) {
			hours_list.push(i);
		}

		var min_list = [];
		for (var i = 0 ; i < 61; i++) {
			min_list.push(i);
		}
		return (
        <div className="panel panel-default">
          <div className="panel-body hours-form">
						{days_list.map(day => 
								<ul key={day} className="list-group hours-form-day">
									<li className="list-group-item hours-selector-day">{this.props.strings[this.getDay(day)]}</li>
									<li className="list-group-item hours-selector-open">
										<input name={"closeCheckbox_" + day} 
													 onChange={this.onCheckboxChange} 
													 type="checkbox" 
													 className="hours-checkbox"
													 checked={this.state["closeCheckbox_" + day]}></input>
									</li>
									<li className="list-group-item li-hours-selector">
										<div className="selectors-group">
											<select className="hours-selector" 
															name={"hourOpen_" + day} 
															value={this.state["hourOpen_" + day]} 
															disabled={this.state["closeCheckbox_" + day]}
															onChange={this.onSelectorChange}>
												{min_list.map(min =>
													<option value={min} key={min}>{min}</option>
													)}
											</select>
											<select className="hours-selector" 
															name={"minOpen_" + day} 
															value={this.state["minOpen_" + day]} 
															disabled={this.state["closeCheckbox_" + day]}
															onChange={this.onSelectorChange}>
												{hours_list.map(hour =>
													<option value={hour} key={hour}>{hour}</option>
													)}
											</select>
										</div>
									</li>
									<li className="list-group-item li-hours-selector">
										<div className="selectors-group">
											<select className="hours-selector" 
															name={"hourClose_" + day} 
															value={this.state["hourClose_" + day]} 
															disabled={this.state["closeCheckbox_" + day]}
															onChange={this.onSelectorChange}>
												{min_list.map(min =>
													<option value={min} key={min}>{min}</option>
													)}
											</select>
											<select className="hours-selector" 
															name={"minClose_" + day} 
															value={this.state["minClose_" + day]} 
															disabled={this.state["closeCheckbox_" + day]}
															onChange={this.onSelectorChange}>
												{hours_list.map(hour =>
													<option value={hour} key={hour}>{hour}</option>
													)}
											</select>
										</div>
									</li>
								</ul>
							)}
          </div>
        </div>
			)
	}
})

export default translate('HoursForm')(HoursForm)
