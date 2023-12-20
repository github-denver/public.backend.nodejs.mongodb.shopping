const Color = require("../models/color.model");
const asyncHandler = require("express-async-handler");
const validateId = require("../utils/validateId");

const colors = asyncHandler(async (request, response) => {
  try {
    const results = await Color.find();

    response.json({
      results,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const create = asyncHandler(async (request, response) => {
  try {
    const results = await Color.create(request.body);

    response.json({
      results,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const read = asyncHandler(async (request, response) => {
  const { id } = request.params;

  try {
    const results = await Color.findById(id);

    response.json({
      results,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const update = asyncHandler(async (request, response) => {
  const { id } = request.params;

  validateId(id);

  try {
    const results = await Color.findByIdAndUpdate(id, request.body, {
      new: true,
    });

    response.json({
      results,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const destroy = asyncHandler(async (request, response) => {
  const { id } = request.params;

  validateId(id);

  try {
    const results = await Color.findByIdAndDelete(id);

    response.json({
      results,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  colors,
  create,
  read,
  update,
  destroy,
};
