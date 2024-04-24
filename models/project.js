const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  bids: [
    {
      type: Schema.Types.ObjectId,
      ref: "bid",
    }
  ],

  bid_requests: [

  ],

  builder: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },

  author: {

  },
  
}, {timestamps: true});

module.exports = { Project:model("project", projectSchema) };