var models  = require('../models');

exports.get_gyms = function(req, res) {
	models.gyms.findAll({}).then(function(gyms) {
		res.send(gyms);
	});
}

exports.add_gym = function(req, res) {
	models.gyms.build(req.body).save().then(function() {
		res.status(200).end();
	});
}