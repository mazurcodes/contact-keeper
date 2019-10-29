const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const User = require("../models/user");

// @route     GET api/auth
// @desc      Get logged in user
// @access    Private
router.get("/", auth, async (req, res) => {
  try {
    const foundUser = await User.findById(req.user.id).select("-password");
    res.status(200).json(foundUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "No such user" });
  }
});

// @route     POST api/auth
// @desc      Auth user & get token
// @access    Public
router.post(
  "/",
  [
    check("email", "Please provide valid email").isEmail(),
    check(
      "password",
      "Please provide valid password with 6 or more characters"
    ).exists()
  ],
  async (req, res) => {
    const { email, password } = req.body;

    // validation of email and password
    const errors = validationResult(req);
    !errors.isEmpty() && res.json({ errors: errors.array() });

    try {
      // finding user with this email
      const foundUser = await User.findOne({ email });
      if (!foundUser) return res.status(400).json({ error: "No such user" });

      // checking password
      const passCorrect = await bcrypt.compare(password, foundUser.password);
      if (!passCorrect)
        return res.status(400).json({ error: "Password don't match" });

      // sending token
      const payload = {
        user: {
          id: foundUser.id
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
      res.json({ error: "Server error" });
    }
  }
);

module.exports = router;
