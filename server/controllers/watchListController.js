const Product = require("../models/Product");
const User = require("../models/User");
const WatchList = require("../models/WatchList");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
var passport = require("passport");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

exports.watchList_create_list = [
    body("listname")
      .notEmpty()
      .withMessage("Listname is required").escape(),
    asyncHandler(async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const newWatchList = new WatchList({
        username: req.body.username,
        listname: req.body.listname,
        products: [],
      });
  
      const createdWatchList = await newWatchList.save();

      const allWatchLists = await WatchList.find({ username: req.body.username }).exec();

      res.json(allWatchLists);
    }),
  ];
  
  
  

exports.watchList_add_product = asyncHandler(async (req, res, next) => {
  const watchList = await WatchList.findOne({
    username: req.body.username,
    listname: req.body.listname,
  }).exec();

  if (
    watchList &&
    (watchList.products.find(
      (product) =>
        (product.productId == req.body.productId) &&
        (product.productType.type == req.body.productType.type)
    ))
  ) {
    res.status(400).json({msg: "Product already in Watchlist."} ); 
  }

  else {
    const updated_watchList = await WatchList.findOneAndUpdate(
    { username: req.body.username, listname: req.body.listname  },
    {
      $push: {
        products: {
          productId: req.body.productId,
          productType: req.body.productType,
        },
      },
    },
    { upsert: true, returnOriginal: false, returnDocument: "after" }
  ).exec();

  res.json(updated_watchList);
}});

exports.watchList_remove_product = asyncHandler(async (req, res, next) => {
  const updated_watchList = await WatchList.findOneAndUpdate(
    { username: req.body.username, listname: req.body.listname },
    {
      $pull: {
        products: {
          productId: req.body.productId,
          productType: req.body.productType,
        },
      },
    },
    { upsert: true, returnOriginal: false, returnDocument: "after" }
  );
  res.json(updated_watchList);
});

exports.watchList_clear = asyncHandler(async (req, res, next) => {
  const updated_watchList = await WatchList.findOneAndUpdate(
    { username: req.body.username },
    {
      $unset: {
        products: "",
      },
    },
    { returnOriginal: false, returnDocument: "after" }
  );
  // console.log(updated_watchList);
  res.json(updated_watchList);
});

// not sure if this works yet
exports.watchList_find_username = asyncHandler(async (req, res, next) => {
  const WatchLists = await WatchList.find({ username: req.params.username })
    .sort({ id: 1 })
    .exec();
  res.json(WatchLists[0]);
});

exports.watchList_find_watchlists = asyncHandler(async (req, res, next) => {
    const WatchLists = await WatchList.find({ username: req.params.username })
      .exec();
    res.json(WatchLists);
  });