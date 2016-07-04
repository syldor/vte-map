var express = require('express');
var router = express.Router();

router.get('/gyms', require('./gym').get_gyms);
router.post('/gyms', require('./gym').add_gym);

router.get('/comments/:gid', require('./comments').get_comments);
router.post('/comments', require('./comments').add_comment);


module.exports = router;