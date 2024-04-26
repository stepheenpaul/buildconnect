const pkg = require("mongoose");
const { model, Schema } = pkg;

const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  budget: {
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
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],

  builder: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },

  author: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  
  project_docs: {

  }
}, {timestamps: true});

module.exports = { Project:model("project", projectSchema) };