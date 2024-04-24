const express = require('express');
const router = express.Router();
const upload = require('../../config/multerSetup');
const { 
  newBid,
  postNewBid,
  myBids,
  allBids,
  projectBids
} = require("../../controllers/bid/bid.controllers");

router.route('/create-bid')
  .get(newBid)
  .post(upload.single('bidImage'), postNewBid);

router.route('/my-bids')
  .get(myBids);

router.route('/all-bids')
  .get(allBids);

router.route('/project-bids')
  .get(projectBids);

module.exports = router; 