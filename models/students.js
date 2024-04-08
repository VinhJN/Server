const mongoose = require("mongoose");
const Scheme = mongoose.Schema;
const Students = new Scheme(
  {
    name: {
      type: String,
    },
    mssv: {
      type: String,
    },
    point: {
      type: Number,
    },
    avatar: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("student", Students);
