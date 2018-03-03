var express = require("express");
var passport = require("passport");
var router = express.Router();
const Form = require("../models/form");
const config = require("../config");

router.patch("/", passport.authenticate("jwt", config.jwtSession), (req, res, next) => {
  Form.findOneAndUpdate(
    { userId: req.user._id },
    { investmentObjective: req.body.investmentObjective },
    { new: true },
    (err, form) => {
      if (err) {
        next(err);
        return;
      }
      res.json(form);
    }
  );
});

module.exports = router;
