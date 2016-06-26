var express = require('express');
var router = express.Router();

router.get('/gyms', require('./gym').get_gyms);
router.post('/gyms', require('./gym').add_gym);

module.exports = router;