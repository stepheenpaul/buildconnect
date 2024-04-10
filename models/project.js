const mongoose = require("mongoose");
const { Schema } = mongoose;

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

  ],

  bid_requests: [

  ],

  author: {

  }
  
}, {timestamps: true});
const Project = mongoose.model("project", projectSchema);
module.exports = Project;
