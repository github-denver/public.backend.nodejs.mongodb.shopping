const { default: mongoose } = require("mongoose");

const connect = () => {
  try {
    const connect = mongoose.connect(process.env.MONGODB);
  } catch (error) {
    console.error(error);

    throw new Error(error);
  }
};

module.exports = connect;
