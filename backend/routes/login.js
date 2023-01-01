const express = require ('express');
const mongoose = require ('mongoose');
require("../models/userDetails");
const User = mongoose.model("UserDetail");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";


const loginRouter = express.Router();
loginRouter.use(express.json());

loginRouter.route('/')
.post( async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: "User Not found." });
    }
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ email: user.email }, JWT_SECRET, 
      //   expiresIn: 10,
      );
  
      if (res.status(201)) {
        return res.json({ status: "ok", data: token });
      } else {
        return res.json({ error: "error" });
      }
    }
    res.json({ status: "error", error: "Invalid Password. Please Try Again." });
  });

  
  module.exports = loginRouter;