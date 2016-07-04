var models  = require('../models');

exports.get_comments = function(req, res) {
	var gym_id = req.param('gid');
	models.comments.findAll({
		where: {
			gym_id: gym_id
		}
	}).then(function(comments) {
		res.send(comments);
	});
}

exports.add_comment = function(req, res) {
	models.comments.build(req.body).save().then(function() {
		res.status(200).end();
	});
}