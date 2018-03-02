var express = require("express");
var router = express.Router();
const Form = require("../models/form");

router.post("/", (req, res, next) => {
  const form = new Form({
    investmentObjective: req.body.investmentObjective
  });
  console.log(form);
  form.save(err => {
    if (err) {
      return next(err);
    }
    res.json({ success: true });
  });
});

module.exports = router;
