var express = require("express");
var router = express.Router();
const config = require('../package.json')

router.get("/", function(req, res, next) { 
      res.json(config.sliderRefreshTime);
});

module.exports = router;