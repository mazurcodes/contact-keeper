const express = require('express');
const router = express.Router();
const Contact = require("../models/contact");

router.get('/', async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
})

router.post('/', async (req, res) => {
  const body = req.body;
  const newContact = new Contact(body);
  try {
    await newContact.save();
    res.redirect('/')
  } catch (err){
    res.json(err)
}
})

router.patch('/:id', async (req, res) => {
  const id = req.params.id;
  const {name} = req.body;
  const regexSearch = RegExp(id, 'i');
  try {
    const updatedContact = await Contact.updateOne({_id: regexSearch},{name});
    res.json(updatedContact);
  } catch (error) {
    res.json(error);
}
})

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const regexSearch = RegExp(id, 'i');
  try {
    const deletedContact = await Contact.deleteOne({_id: regexSearch});
    res.json(deletedContact);
  } catch (error) {
    res.json(error);
  }
})

module.exports = router;