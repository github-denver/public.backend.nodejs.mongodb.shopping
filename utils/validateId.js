const mongoose = require("mongoose");

const validateId = (id) => {
  const valid = mongoose.Types.ObjectId.isValid(id);

  if (!valid) {
    throw new Error("아이디를 찾을 수 없습니다.");
  }
};

module.exports = validateId;
