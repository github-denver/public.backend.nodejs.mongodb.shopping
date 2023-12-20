const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const { generateToken } = require("../configs/token");
const validateId = require("../utils/validateId");
const { generateRefreshToken } = require("../configs/refreshToken");

const createUser = asyncHandler(async (request, response) => {
  const email = request.body.email;
  const findUser = await User.findOne({ email });

  if (!findUser) {
    // 새 사용자 만들기
    const newUser = await User.create(request.body);

    response.json({
      message: `${newUser.email} 사용자가 등록되었습니다.`,
      results: newUser,
    });
  } else {
    throw new Error("사용자가 이미 존재합니다.");
  }
});

const getUsers = asyncHandler(async (request, response) => {
  try {
    const getUsers = await User.find();

    response.json(getUsers);
  } catch (error) {
    throw Error(error);
  }
});

const loginUser = asyncHandler(async (request, response) => {
  const { email, password } = request.body;

  // 사용자 존재 여부 확인
  const findUser = await User.findOne({ email });
  const match = await findUser.isPasswordMatched(password);

  if (findUser.blocked) {
    throw new Error("아이디가 정지되었습니다. 관리자에게 문의해 주세요.");
  }

  if (findUser && match) {
    const refreshToken = await generateRefreshToken(findUser.id);

    const updateUser = await User.findByIdAndUpdate(
      findUser.id,
      {
        refreshToken,
      },
      { new: true }
    );

    response.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000, // 시 * 분 * 초 * 밀리세컨드
    });

    response.json({
      _id: findUser._id,
      email: findUser.email,
      name: findUser.name,
      phone: findUser.phone,
      token: generateToken(findUser._id),
    });
  } else {
    throw new Error("입력하신 정보가 유효하지 않습니다.");
  }
});

const getUserById = asyncHandler(async (request, response) => {
  const { id } = request.params;

  validateId(id);

  try {
    const getUserById = await User.findById(id);

    response.json(getUserById);
  } catch (error) {
    console.error(error);

    throw new Error(error);
  }
});

const destroyUser = asyncHandler(async (request, response) => {
  const { id } = request.params;
  console.log({ id });

  validateId(id);

  try {
    const destroyUser = await User.findByIdAndDelete(id);

    response.json({
      message: `${destroyUser.email} 사용자가 삭제되었습니다.`,
      results: destroyUser,
    });
  } catch (error) {
    console.error(error);

    throw new Error(error);
  }
});

module.exports = {
  createUser,
  loginUser,
  getUsers,
  getUserById,
  destroyUser,
};
