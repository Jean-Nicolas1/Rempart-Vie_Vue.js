var express = require("express");
var router = express.Router();
var passport = require("passport");
const User = require("../models/user");
const config = require("../config");

router.get("/", passport.authenticate("jwt", config.jwtSession), (req, res) => {
  res.json(req.user);
});

module.exports = router;
