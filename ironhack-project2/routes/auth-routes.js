const express = require('express');
const authRoutes = express.Router();
const passport = require("passport");
const flash        = require("connect-flash");

const User = require('../models/User.js')
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

const ensureLogin = require("connect-ensure-login");

authRoutes.get("/signup", (req, res, next) => {
    res.render("signup");
  });
  
  authRoutes.post("/signup", (req, res, next) => {
    const name = req.body.name;
    const password = req.body.password;
  
    if (name === "" || password === "") {
      res.render("signup", { message: "Indicate name and password" });
      return;
    }
  
    User.findOne({name})
    .then(user => {
      if (user !== null) {
        res.render("signup", { message: "The username already exists" });
        return;
      }
  
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);
  
      const newUser = new User({
        name: req.body.name,
        password: hashPass
      });
  
      newUser.save((err) => {
        if (err) {
          res.render("signup", { message: "Something went wrong" });
        } else {
          res.redirect("/");
        }
      });
    })
    .catch(error => {
      next(error)
    })
  });

  authRoutes.get("/login", (req, res, next) => {
    res.render("auth/login", { "message": req.flash("error") });
  });
  
  authRoutes.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true
  }));
  
  
  authRoutes.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/login");
  });
  
  authRoutes.get("/private-page", ensureLogin.ensureLoggedIn(), (req, res) => {
    res.render("private", { user: req.user });
  });

  module.exports = authRoutes;