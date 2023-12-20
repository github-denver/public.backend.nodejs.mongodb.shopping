const Product = require("../models/product.model");
const User = require("../models/user.model");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const validateId = require("../utils/validateId");

const products = asyncHandler(async (request, response) => {
  try {
    const q = { ...request.query };

    const exclude = ["fields", "sort", "limit", "page"];
    exclude.forEach((value) => delete q[value]);

    let qs = JSON.stringify(q);
    qs = qs.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Product.find(JSON.parse(qs)).populate("colors");

    if (request.query.sort) {
      const _sort = request.query.sort.split(",").join(" ");

      query = query.sort(_sort);
    } else {
      query = query.sort("-createdAt"); // ASC: createdAt, DESC: -createdAt
    }

    if (request.query.fields) {
      const _fields = request.query.fields.split(",").join(" ");

      query = query.select(_fields);
    } else {
      query = query.select("-__v"); // 포함: __v, 제외: -__v
    }

    const page = request.query.page;
    const limit = request.query.limit;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if (request.query.page) {
      const total = await Product.countDocuments();

      if (skip >= total) {
        throw new Error("이 페이지 번호는 존재하지 않습니다.");
      }
    }

    const results = await query;

    response.json({
      results,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const create = asyncHandler(async (request, response) => {
  try {
    if (request.body.name) {
      request.body.slug = slugify(request.body.name);
    }

    const results = await Product.create(request.body);

    response.json({
      results,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const read = asyncHandler(async (request, response) => {
  const { id } = request.params;

  validateId(id);

  try {
    const results = await Product.findById(id).populate("colors");

    response.json({
      results,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const update = asyncHandler(async (request, response) => {
  const { id } = request.params;

  try {
    if (request.body.name) {
      request.body.slug = slugify(request.body.name);
    }

    const results = await Product.findOneAndUpdate(
      {
        _id: id,
      },
      request.body,
      {
        new: true,
      }
    );

    response.json({
      results,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const destroy = asyncHandler(async (request, response) => {
  const { id } = request.params;

  try {
    const results = await Product.findByIdAndDelete(id);

    response.json({
      results,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  products,
  create,
  read,
  update,
  destroy,
};
