const Product = require("../models/Product");
const User = require("../models/User");
const Cart = require("../models/Cart");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
var passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

exports.cart_add_product = asyncHandler(async (req, res, next) => {
  // await message.populate("sent_by");
  const updated_cart = await Cart.findOneAndUpdate(
    { username: req.body.username },
    {
      $push: {
        products: {
          productId: req.body.productId,
          productType: req.body.productType,
          quantity: req.body.quantity,
        },
      },
    },
    { upsert: true, returnOriginal: false, returnDocument: "after" }
  ).exec();
  res.json(updated_cart);
  // console.log(updated_cart);
});

exports.cart_remove_product = asyncHandler(async (req, res, next) => {
  // await message.populate("sent_by");
  const updated_cart = await Cart.findOneAndUpdate(
    { username: req.body.username },
    {
      $pull: {
        products: {
          productId: req.body.productId,
          quantity: req.body.quantity,
        },
      },
    },
    { upsert: true, returnOriginal: false, returnDocument: "after" }
  );
  // console.log(updated_cart);
  res.json(updated_cart);
});

exports.cart_clear = asyncHandler(async (req, res, next) => {
  // await message.populate("sent_by");
  const updated_cart = await Cart.findOneAndUpdate(
    { username: req.body.username },
    {
      $unset: {
        products: "",
      },
    },
    { returnOriginal: false, returnDocument: "after" }
  );
  // console.log(updated_cart);
  res.json(updated_cart);
});

exports.cart_update_product = asyncHandler(async (req, res, next) => {
  let updated_cart = await Cart.findOneAndUpdate(
    {
      username: req.body.username,
      products: {
        $elemMatch: {
          productId: req.body.productId,
          "productType.type": req.body.productType.type,
        },
      },
    },
    { $inc: { "products.$.quantity": req.body.quantity } },
    { new: true }
  );

  if (!updated_cart) {
    updated_cart = await Cart.findOneAndUpdate(
      { username: req.body.username },
      {
        $push: {
          products: {
            productId: req.body.productId,
            productType: req.body.productType,
            quantity: req.body.quantity,
          },
        },
      },
      { upsert: true, returnOriginal: false, returnDocument: "after" }
    );
  }
  // check if new product has a quantity of <= 0
  if (updated_cart && updated_cart.products) {
    const updatedProduct = updated_cart.products.find(
      (product) =>
        product.productId === req.body.productId &&
        product.productType.type === req.body.productType.type
    );

    if (updatedProduct && updatedProduct.quantity <= 0) {
      updated_cart = await Cart.findOneAndUpdate(
        { username: req.body.username },
        {
          $pull: {
            products: {
              productId: req.body.productId,
              productType: req.body.productType,
            },
          },
        },
        { new: true }
      );
    }
  }

  res.json(updated_cart);
});

// not sure if this works yet
exports.cart_find_username = asyncHandler(async (req, res, next) => {
  const UserCarts = await Cart.find({ username: req.params.username }).sort({
    id: 1,
  });
  if (UserCarts.length > 0) {
    res.json(UserCarts[0]);
  } else {
    const newCart = new Cart({
      username: req.params.username,
    });

    await newCart.save();

    res.json(newCart);
  }
});

// exports.cart_total_username = asyncHandler(async (req, res, next) => {
//   const cart_total = await Cart.aggregate([
//     {
//       $match: { username: req.params.username },
//     },
//     {
//       $unwind: "$products",
//     },
//     // {
//     //   $lookup: {
//     //     from: "products",
//     //     localField: "products.productId",
//     //     foreignField: "id",
//     //     as: "inventory_docs",
//     //   },
//     // },
//     {
//       $project: {
//         username: "$username",
//         productIdd: "$products.productId",
//         productTypee: "$products.productType",
//         quantity: "$products.quantity",
//         price: "$products.productType.price",
//         // price: {
//         //   $arrayElemAt: ["$inventory_docs.price", 0],
//         // },
//       },
//     },
//     {
//       $addFields: {
//         cost: {
//           $multiply: ["$price", "$quantity"],
//         },
//       },
//     },
//     {
//       $group: {
//         _id: "$_id",
//         username: { $first: "$username" },
//         totalAmount: { $sum: { $multiply: ["$price", "$quantity"] } },
//         totalQuantity: { $sum: "$quantity" },
//         count: { $sum: 1 },
//       },
//     },
//   ]).exec();
//   if (cart_total[0] == []) {
//     res.json([
//       {
//         username: req.params.username,
//         totalAmount: 0.0,
//         totalQuantity: 0,
//         count: 0,
//       },
//     ]);
//   }
//   res.json(cart_total[0]);
// });

exports.cart_total_username = asyncHandler(async (req, res, next) => {
  const cart_total = await Cart.aggregate([
    {
      $match: { username: req.params.username },
    },
    {
      $unwind: "$products",
    },
    {
      $project: {
        username: "$username",
        productIdd: "$products.productId",
        productTypee: "$products.productType",
        quantity: "$products.quantity",
        price: "$products.productType.price",
      },
    },
    {
      $addFields: {
        cost: {
          $multiply: ["$price", "$quantity"],
        },
      },
    },
    {
      $group: {
        _id: "$_id",
        username: { $first: "$username" },
        totalAmount: { $sum: "$cost" },
        totalQuantity: { $sum: "$quantity" },
        count: { $sum: 1 },
      },
    },
  ]).exec();

  if (!cart_total || cart_total.length === 0) {
    res.json([
      {
        username: req.params.username,
        totalAmount: 0.0,
        totalQuantity: 0,
        count: 0,
      },
    ]);
  }

  res.json(cart_total[0]);
});
