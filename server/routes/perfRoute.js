var express = require("express");
var passport = require("passport");
var router = express.Router();
const Performance = require("../models/performance");
const config = require("../config");

router.get("/", passport.authenticate("jwt", config.jwtSession), (req, res, next) => {
  Performance.find((err, perfList) => {
    if (err) {
      next(err);
      return;
    }
    res.json(perfList);
  });
});

module.exports = router;
