var express = require("express");
var router = express.Router();
var passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const user_controller = require("../controllers/userController");
const product_controller = require("../controllers/productController");
const cart_controller = require("../controllers/cartController");
const watchList_controller = require("../controllers/watchListController");

// user controllers
router.post("/login", user_controller.user_login);
router.post("/register", user_controller.user_register);
router.get("/log-out", user_controller.user_logout);
router.get("/user", user_controller.user_get);
router.post("/user/change-password", user_controller.user_change_password);
router.post("/user/addAddress", user_controller.user_add_address);
router.post("/user/removeAddress", user_controller.user_remove_address);
router.post("/user/updateAddress", user_controller.user_update_address);

// product controllers
router.get("/products", product_controller.product_list);
router.get("/products/:id", product_controller.product_find);
router.get("/products/search/:title", product_controller.product_search_title);
router.get(
  "/products/get/new-releases",
  product_controller.product_sort_by_date
);
router.post("/product/add", product_controller.product_add);
router.get(
  "/products/search/genre/:genre",
  product_controller.products_search_genre
);
router.get(
  "/products/search/genres/genrelist",
  product_controller.product_all_genres
);

// cart controllers
router.get("/carts/users/:username", cart_controller.cart_find_username);
router.post("/carts/add", cart_controller.cart_add_product);
router.post("/carts/remove", cart_controller.cart_remove_product);
router.post("/carts/update", cart_controller.cart_update_product);
router.post("/carts/clear", cart_controller.cart_clear);
router.get("/carts/total/:username", cart_controller.cart_total_username);

router.get(
  "/watchlist/users/:username",
  watchList_controller.watchList_find_watchlists
);
router.post("/watchlist/addList", watchList_controller.watchList_create_list);
router.post(
  "/watchlist/addProduct",
  watchList_controller.watchList_add_product
);
router.post(
  "/watchlist/removeProduct",
  watchList_controller.watchList_remove_product
);
router.post("/watchlist/clear", watchList_controller.watchList_clear);

module.exports = router;
