const mongoose = require("mongoose");

const connectioDB = () => {
  mongoose
    .connect("mongodb://localhost:27017/ecommece3", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("successfully connect...."))
    .catch((error) => console.log("No Connection"));
};

module.exports = connectioDB;
