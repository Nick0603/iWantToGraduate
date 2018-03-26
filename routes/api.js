var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/api', function (req, res, next) {
    res.render('test');
});

module.exports = router;
