const express = require ('express');
const mongoose = require ('mongoose');
require("../models/userDetails");
const User = mongoose.model("UserDetail");
const jwt = require("jsonwebtoken");

const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

const accountRouter = express.Router();
accountRouter.use(express.json());

accountRouter.route('/')
.post(async (req, res) => {
    const { token } = req.body;
    try {
      const user = jwt.verify(token, JWT_SECRET, (err, res) => {
        if (err) {
          return "token expired";
        }
        return res;
      });
      console.log(user);
      if (user == "token expired") {
        return res.send({ status: "error", data: "token expired" });
      }
  
      const useremail = user.email;
      User.findOne({ email: useremail })
        .then((data) => {
          res.send({ status: "ok", data: data });
        })
        .catch((error) => {
          res.send({ status: "error", data: error });
        });
    } catch (error) {}
  })
  .put(async (req, res) => {
    const { ary } = req.body;
    const {email} = data.email;
    // try {
    //   const user = jwt.verify(token, JWT_SECRET, (err, res) => {
    //     if (err) {
    //       return "token expired";
    //     }
    //     return res;
    //   });
    //   console.log(user);
    //   if (user == "token expired") {
    //     return res.send({ status: "error", data: "token expired" });
    //   }
  
    //   const useremail = user.email;

      User.findOne({ email })
        .then((data) => {
          data.bus  = ary;
          res.send({ status: "ok", data: data });
        })
        .catch((error) => {
          res.send({ status: "error", data: error });
        });
    } 
    );
  
  module.exports = accountRouter;