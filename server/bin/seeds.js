const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect("mongodb://localhost/Rempart-Vie-DB");

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
