var express = require("express");
var passport = require("passport");
var router = express.Router();
const Capital = require("../models/capital");
const config = require("../config");

router.get("/", passport.authenticate("jwt", config.jwtSession), (req, res, next) => {
  Capital.findOne({ userId: req.user._id }, (err, capital) => {
    if (err) {
      next(err);
      return;
    }
    res.json(capital);
  });
});

router.patch("/", passport.authenticate("jwt", config.jwtSession), (req, res, next) => {
  Capital.findOneAndUpdate({ userId: req.user._id }, req.body, { new: true }, (err, capital) => {
    if (err) {
      next(err);
      return;
    }
    res.json(req.body);
  });
});

module.exports = router;
