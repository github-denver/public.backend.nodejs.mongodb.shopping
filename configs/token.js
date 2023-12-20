const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "3d", // 60m: 유효 시간 60분, 1d: 1일
  });
};

module.exports = { generateToken };
