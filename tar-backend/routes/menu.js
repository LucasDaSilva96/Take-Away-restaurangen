const express = require('express');
const { getMenu, createMenu } = require('../controllers/menu');
const {checkAuth, checkRole} = require("../middlewares/mw");
const router = express.Router();
// Get all menu items
router.get('/', getMenu);

// Create a new menu item
// TODO: Add authentication middleware ?
router.post('/',checkAuth, checkRole , createMenu);

module.exports = router;
