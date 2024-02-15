const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var createError = require("http-errors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const cors = require("cors");
const jsonParser = bodyParser.json();
const User = require("./models/User");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
require("dotenv").config();
const bcrypt = require("bcrypt");
var indexRouter = require("./routes/index");
app.use(express.static(path.join(__dirname, "public")));

// require("./passportConfig")(passport);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const mongoDb = (process.env.MONGODB_API);
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

// PASSPORT
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const match = bcrypt.compareSync(password, user.password);
      if (!match) {
        // passwords do not match!
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    cookie: {
      expires: 60 * 60 * 24,
      httpOnly: false,
    },
  })
);
app.use(cookieParser("secret"));
app.use(
  cors({
    origin: "http://localhost:5173", // <-- location of the react app were connecting to
    credentials: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

// START OF ROUTES
app.use("/", indexRouter);

// END OF ROUTES

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("error");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
