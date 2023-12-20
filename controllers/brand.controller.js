const Brand = require("../models/brand.model");
const asyncHandler = require("express-async-handler");
const validateId = require("../utils/validateId");

const brands = asyncHandler(async (request, response) => {
  try {
    const results = await Brand.find();

    response.json({
      results,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const create = asyncHandler(async (request, response) => {
  const { id } = request.user;

  validateId(id);

  try {
    const results = await Brand.create(request.body);

    response.json({
      results: results,
    });
  } catch (error) {
    console.error(error);

    throw new Error(error);
  }
});

const read = asyncHandler(async (request, response) => {
  const { id } = request.params;

  try {
    const results = await Brand.findById(id);

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
    const results = await Brand.findByIdAndUpdate(id, request.body, {
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
    const results = await Brand.findByIdAndDelete(id);

    response.json({
      results,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  brands,
  create,
  read,
  update,
  destroy,
};
