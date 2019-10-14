const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

// @route     GET api/contacts
// @desc      Get all user contacts
// @access    Private
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id })
      .sort({ date: -1 })
      .select("-__v -user");
    res.json(contacts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

// @route     POST api/contacts
// @desc      Add new contact
// @access    Private
router.post(
  "/",
  auth,
  [
    check("name", "Please provide contact's name")
      .isString()
      .not()
      .isEmpty(),
    check("email", "Please provide valid contact's email").isEmail()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ error: errors.array() });
    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        user: req.user.id,
        name,
        email,
        phone,
        type
      });
      await newContact.save();
      res.redirect("/api/contacts");
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Server Error" });
    }
  }
);

// @route     PUT api/contacts
// @desc      Modify user contact
// @access    Private
router.put(
  "/:id",
  auth,
  [
    check("name", "Please provide contact's name")
      .isString()
      .not()
      .isEmpty(),
    check("email", "Please provide valid contact's email").isEmail(),
    check("phone", "Please provide contact's phone").isNumeric()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ error: errors.array() });

      const id = req.params.id;
      const userId = req.user.id;
      const { name, email, phone, type } = req.body;


    // create object only with updated fields
    const updateFields = {};
    if (name) updateFields.name = name;
    if (email) updateFields.email = email;
    if (phone) updateFields.phone = phone;
    if (type) updateFields.type = type;

    try {
      // check if current user owns contact to update
      const contact = await Contact.findById(id);
      if (contact.user.toString() !== userId)
        return res.status(401).json({ error: "Not authorized" });

      // if yes then proceed
      await Contact.updateOne({ _id: id }, { $set: updateFields });

      res.redirect("/api/contacts");
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Server Error" });
    }
  }
);

// @route     DELETE api/contacts
// @desc      Delete user's contact
// @access    Private
router.delete("/:id", auth, async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;

  try {
    // check if current user owns contact to delete
    const contact = await Contact.findById(id);
    if (contact.user.toString() !== userId)
      return res.status(401).json({ error: "Not authorized" });

    // if yes then proceed
    await Contact.findByIdAndDelete(id);
    res.redirect("/api/contacts");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
