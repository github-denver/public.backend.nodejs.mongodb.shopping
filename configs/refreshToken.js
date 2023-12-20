const jwt = require("jsonwebtoken");

const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "3d", // 60m: 유효 시간 60분, 3d: 3일
  });
};

module.exports = { generateRefreshToken };
