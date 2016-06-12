var express = require('express');
var app = express();
var api = require('./routes/api')
var models = require('./models');
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use('/api', api);

app.use(express.static('../app/build'));

models.sequelize.sync().then(function () {
	app.listen(3000, function () {
	  console.log('Example app listening on port 3000!');
	});
});