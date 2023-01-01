const express = require ('express');
const mongoose = require ('mongoose');
require("../models/userDetails");
const User = mongoose.model("UserDetail");
const bcrypt = require("bcryptjs");


const registerRouter = express.Router();
registerRouter.use(express.json());

registerRouter.route('/')
.post( async (req, res) => {
    const { fname, lname, email, password } = req.body;
  
    const encryptedPassword = await bcrypt.hash(password, 10);
    try {
      const oldUser = await User.findOne({ email });
  
      if (oldUser) { 
        return res.json({ error: "User Exists" });
      }
      await User.create({ 
        fname,
        lname,
        email,
        password: encryptedPassword,
        bus: null,
      });
      res.send({ status: "ok" });
    } catch (error) {
      res.send({ status: "error" });
    }
  });

  module.exports = registerRouter;