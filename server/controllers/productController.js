const Product = require("../models/Product");
const User = require("../models/User");
const Cart = require("../models/Cart");

const asyncHandler = require("express-async-handler");
var passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const mem_key = "password";
const { body, validationResult } = require("express-validator");

exports.product_list = asyncHandler(async (req, res, next) => {
  const allProducts = await Product.find({approved: true}).sort({ id: 1 }).exec();
  res.send(allProducts);
});

exports.product_find = asyncHandler(async (req, res, next) => {
  const allProducts = await Product.find({ id: req.params.id, approved:true }).exec();
  // console.log(allProducts[0]);
  res.json(allProducts[0]);
});

exports.product_search_title = asyncHandler(async (req, res, next) => {
  const allProducts = await Product.find({approved: true,
    title: new RegExp(req.params.title, "i"),
  }).exec();
  res.json(allProducts);
});

exports.product_sort_by_date = asyncHandler(async (req, res) => {
  const allProducts = await Product.find({approved: true}).sort({ year: -1 }).exec();
  // console.log(allProducts[0]);
  res.send(allProducts);
});

exports.products_search_genre =   asyncHandler(async (req, res, next) => {
  const allProducts = await Product.find({ genre: req.params.genre }).exec();
  res.json(allProducts);
});

exports.product_all_genres =   asyncHandler(async (req, res, next) => {
  const allGenres = await Product.distinct("genre");
  res.send(allGenres);
});

exports.product_add = [
  // // Handle Post create on POST.
  // Validate and sanitize fields.
  body("title", "Title must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("description", "Description must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    const checkIndex = await Product.find().sort({id:-1}).limit(1)
    const newId = checkIndex[0].id + 1;

    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create product object with escaped and trimmed data
    const newProduct = new Product({
      id: newId,
      title: req.body.title,
      description: req.body.description,
      year: req.body.year,
      genre: req.body.genre,
      certificate: req.body.certificate,
      director: req.body.director,
      writers: req.body.writers,
      actors: req.body.actors,
      price: req.body.price,
      image: req.body.image,
      approved: false
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.json(errors);
      console.log(errors);
      return;
    } else {
      // Data from form is valid.
      // Save post.
      await newProduct.save();
      // Redirect to new author record.
      console.log(newProduct);
      res.send("Product Saved");
    }
  })
];
