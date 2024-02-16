const Product = require("../models/Product");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
var passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

exports.user_login = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send(info.message);
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Successfully Authenticated");
        console.log("authentication successful");
        console.log(req.user);
      });
    }
  })(req, res, next);
};


exports.user_register = async (req, res, next) => {
  try {
    bcrypt.hash(await req.body.password, 10, async (err, hashedPassword) => {
      if (err) {
        console.log(err);
      } else {
        const user = new User({
          email: req.body.email,
          username: req.body.username,
          password: hashedPassword,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          address: req.body.address,
        });
        const result = await user.save();
        res.send(user);
        console.log("user information sent to client side");
      }
    });
  } catch (err) {
    return next(err);
  }
};

exports.user_get = (req, res) => {
  res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
};

exports.user_logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.send("Successfully logged out");
  });
};

exports.user_change_password = async (req, res) => {
  //Check passwords match
  if (req.body.newPassword != req.body.confirmNewPassword) {
    res.send({ msg: "New passwords do not match." });
  } else {
    //VALIDATION PASSED
    //Ensure current password submitted matches
    User.findOne({ username: req.body.username }).then((user) => {
      //encrypt newly submitted password
      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          //Update password for user with new password
          bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(req.body.newPassword, salt, (err, hash) => {
              if (err) throw err;
              user.password = hash;
              user.save();
            })
          );
          res.send("Password successfully updated!");
        } else {
          //Password does not match
          res.send("Password is Incorrect");
        }
      });
    });
  }
};

exports.user_add_address = [
  body("firstName", "First Name must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("lastName", "Last Name must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("address", "Address must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("postalCode", "Postal Code must Not be Empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("city", "City must not be empty").trim().isLength({ min: 1 }).escape(),
  body("province", "Province must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("country", "Country must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const addressParts = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      postalCode: req.body.postalCode,
      city: req.body.city,
      province: req.body.province,
      country: req.body.country,
    };

    if (req.body.apartment) {
      addressParts.apartment = req.body.apartment;
    }
    if (req.body.company) {
      addressParts.company = req.body.appartment;
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json(errors);
      console.log(errors);
    } else {
      const updated_user = await User.findOneAndUpdate(
        { username: req.body.username },
        {
          $push: {
            address: addressParts,
          },
        },
        { upsert: true, returnOriginal: false, returnDocument: "after" }
      ).exec();
      res.json(updated_user);
      console.log(updated_user);
    }
  })
];

exports.user_remove_address = asyncHandler(async (req, res, next) => {
  const { username, addressToRemove } = req.body;

  const updated_user = await User.findOneAndUpdate(
    { username: req.body.username },
    {
      $pull: {
        address: addressToRemove,
      },
    },
    { upsert: true, returnOriginal: false, returnDocument: "after" }
  );

  // console.log(updated_user);
  res.json(updated_user);
});

exports.user_update_address = asyncHandler(async (req, res, next) => {
  try {
    const updated_user = await User.findOneAndUpdate(
      { username: req.body.username },
      {
        $set: {
          'address.$[elem]': req.body.newAddress,
        },
      },
      {
        arrayFilters: [
          { 'elem': req.body.oldAddress },
        ],
        upsert: true,
        returnOriginal: false,
        returnDocument: "after",
      }
    );

    if (!updated_user) {
      return res.status(404).json({ error: 'User not found' });
    }

    console.log(updated_user);
    console.log( req.body.oldAddress);
    console.log( req.body.newAddress);


    res.json(updated_user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
