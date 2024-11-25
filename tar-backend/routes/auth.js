const express = require('express');
const { getMenu, createMenu } = require('../controllers/menu');
const {signupUser, signInUser} = require("../controllers/Auth");
const router = express.Router();

router.post("/sign-up", signupUser)
router.post("/sign-in", signInUser)

module.exports = router;
