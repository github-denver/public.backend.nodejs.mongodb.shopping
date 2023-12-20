const Category = require("../models/product.category.model");
const asyncHandler = require("express-async-handler");
const validateId = require("../utils/validateId");

const categories = asyncHandler(async (request, response) => {
  try {
    const results = await Category.find();

    response.json({
      results,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const create = asyncHandler(async (request, response) => {
  try {
    const results = await Category.create(request.body);

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
    const results = await Category.findById(id);

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
    const results = await Category.findByIdAndUpdate(id, request.body, {
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
    const results = await Category.findByIdAndDelete(id);

    response.json({
      results,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  categories,
  create,
  read,
  update,
  destroy,
};
