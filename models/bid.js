const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const bidSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  amount: {
    type: String,
    required: true,
  },

  builder: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },

  bid_status: {
    type: String
  },
  
}, {timestamps: true});

module.exports = { Bid: model("bid", bidSchema) };
