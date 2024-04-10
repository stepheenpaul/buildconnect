const mongoose = require("mongoose");
const { Schema } = mongoose;

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
    
  }
  
}, {timestamps: true});
const Bid = mongoose.model("bid", bidSchema);
module.exports = Bid;
