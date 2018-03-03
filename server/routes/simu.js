var express = require("express");
var router = express.Router();
const passport = require("passport");
const config = require("../config");

router.get(
  "/",
  // this is protecting the route and giving us access to
  // req.user
  passport.authenticate("jwt", config.jwtSession),
  (req, res) => {
    // send the user his own information
    res.json(req.user);
  }
);

module.exports = router;
