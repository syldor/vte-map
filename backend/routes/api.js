var express = require('express');
var router = express.Router();

router.get('/', require('./gym').get_gyms);
router.post('/', require('./gym').add_gym);

module.exports = router;