var express = require('express');
var router = express.Router();

/**
 * GET mail listing
 */
router.get('/', function(req, res, next) {
  res.json('respond with a json');
});

/**
 * Post mail listing
 */
router.post("/", function (req, res, next) {
    res.json({"SUCCESS" : true, "message": "return message"});
});


module.exports = router;
