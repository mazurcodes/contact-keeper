const express = require('express');
const router = express.Router();
const User = require("../models/user");

// @route     GET api/auth
// @desc      Get logged in user
// @access    Private 

router.get('/', async (req, res) => {
  
})

// @route     POST api/auth
// @desc      Auth user & get token
// @access    Public

router.post('/', async (req, res) => {
  
})

module.exports = router;