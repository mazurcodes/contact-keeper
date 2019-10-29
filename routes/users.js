const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

// router.get("/:userName", async (req, res) => {
//   const userName = req.params.userName;
//   const regexSearch = RegExp(userName, "i");
//   const foundUser = await User.findOne({ name: regexSearch });
//   res.json(foundUser);
// });

router.post(
  "/",
  [
    check("name", "Please add name")
      .not()
      .isEmpty(),
    check("email", "Please include valid email").isEmail(),
    check(
      "password",
      "Please provide valid password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    // validation
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    const { name, email, password } = req.body;
    // validation ok? try to create new user
    try {
      // check if there is a user with this email in db
      let userExists = await User.findOne({ email });
      if (userExists)
        return res
          .status(400)
          .json({ error: "User with this email already exist" });

      // if not create one
      const newUser = new User({ name, email, password });

      // hashing password
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(newUser.password, salt);
      await newUser.save();

      // creating JWT token
      const payload = {
        user: {
          id: newUser.id
        }
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 36000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Server Error" });
    }
  }
);

module.exports = router;
