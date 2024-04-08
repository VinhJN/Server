const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const local = "mongodb://127.0.0.1:27017/SinhVien";

const connect = async () => {
  try {
    await mongoose.connect(local, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect Success");
  } catch (error) {
    console.log(error);
    console.log("Connect Fail");
  }
};

module.exports = { connect };
