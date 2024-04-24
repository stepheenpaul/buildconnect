const express = require('express');
const router = express.Router();
const upload = require('../../config/multerSetup');
const {isUserAdmin} = require("../../config/middlewares");

const { 
  viewUser,
  blockUser, 
  unblockUser
} = require("../../controllers/user/user.controllers");

router.get('/view-user', viewUser);
router.put('/block-user', isUserAdmin, blockUser);
router.put('/unblock-user', isUserAdmin, unblockUser);

module.exports = router; 