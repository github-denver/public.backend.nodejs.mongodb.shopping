const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");

const auth = asyncHandler(async (request, response, next) => {
  let token;

  if (request?.headers?.authorization?.startsWith("Bearer")) {
    token = request.headers.authorization.split(" ")[1];

    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        request.user = user;

        next();
      }
    } catch (error) {
      throw new Error("토큰이 만료되었습니다. 다시 로그인해 주세요.");
    }
  } else {
    throw new Error("연결된 토큰이 없습니다.");
  }
});

const admin = asyncHandler(async (request, response, next) => {
  const { email } = request.user;

  const admin = await User.findOne({ email });

  if (admin.role !== "admin") {
    throw new Error("관리자가 아닙니다.");
  } else {
    next();
  }
});

module.exports = { auth, admin };
