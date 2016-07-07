var models  = require('../models');

exports.get_gyms = function(req, res) {
	models.gyms.findAll({
		include:[{
			model: models.hours,
			required: false
		}]
	}).then(function(gyms) {
		res.send(gyms);
	});
}

exports.add_gym = function(req, res) {
	models.sequelize.transaction().then(function(t) {
		var gyms = req.body;
		var hours = req.body.new_gym_hours;
		console.log(req.body);
		delete gyms.new_gym_hours;	
		console.log(hours);
		models.gyms.build(req.body).save({
			transaction: t
		}).then(function(gym) {
			hours.forEach(function(hour) {
				hour.gym_id = gym.id;
			})
			models.hours.bulkCreate(hours, {
				transaction: t
			}).then(function() {
				t.commit();			
				res.status(200).end();
			}).catch(function() {
				t.rollback();
				res.status(400).end();
			})
		});
	});
}