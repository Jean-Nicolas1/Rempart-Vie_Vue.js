const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect("mongodb://heroku_lhc73s6b:7cfn9410v75er2nunap9hpe9rc@ds261088.mlab.com:61088/heroku_lhc73s6b");

const Performance = require("../models/performance");

const performances = [
  {
    month: "Septembre 2017",
    perf: 0.03
  },
  {
    month: "Octobre 2017",
    perf: 0.02
  },
  {
    month: "Novembre 2017",
    perf: -0.01
  },
  {
    month: "Décembre 2017",
    perf: 0.05
  },
  {
    month: "Janvier 2018",
    perf: 0.02
  },
  {
    month: "Février 2018",
    perf: 0.01
  },
  {
    month: "Mars 2018",
    perf: -0.02
  }
];

Performance.create(performances, (err, docs) => {
  if (err) {
    throw err;
  }

  docs.forEach(performance => {
    console.log(performance.month);
  });
  mongoose.connection.close();
});
