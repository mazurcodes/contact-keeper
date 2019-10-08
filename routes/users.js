const express = require('express');
const router = express.Router();
const User = require("../models/user");

router.get('/:userName', async (req, res) => {
  const userName = req.params.userName;
  const regexSearch = RegExp(userName, 'i');
  const foundUser = await User.find(({name: regexSearch}));
  res.json(foundUser);
})

router.post('/', async (req, res) => {
  const body = req.body;
  const newUser = new User(body);
  console.log(body);
  try {
    await newUser.save();
    res.send(newUser);
  } catch (err){
    res.json(err);
}
})

// router.patch('/:userName', async (req, res) => {
//   const userName = req.params.userName;
//   const {[UPDATE_VALUES]} = req.body;
//   const regexSearch = RegExp(userName, 'i');
//   try {
//     const [UPDATE_ELEMENT] = await User.updateOne({[FIELD_SEARCH]: regexSearch},{[UPDATE_VALUES]});
//     res.json([UPDATE_ELEMENT]);
//   } catch (error) {
//     res.json(error);
// }
// })

// router.delete('/:userName', async (req, res) => {
//   const userName = req.params.userName;
//   const regexSearch = RegExp(userName, 'i');
//   try {
//     const delUser = await User.deleteOne({name: regexSearch});
//     res.json(delUser);
//   } catch (error) {
//     res.json(error);
//   }
// })

module.exports = router;