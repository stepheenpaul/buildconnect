const mongoose = require("mongoose");
const { Schema } = mongoose;

const notificationSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  recipient: {
    
  },

// bid_interest, bid_invite bid_request_received, bid_submitted
  notification_type: {
    type: String,
    required: true,
  },

  read: {
    type: Boolean,
    default: false,
  },
  
}, {timestamps: true});

const Notification = mongoose.model("notification", notificationSchema);
module.exports = Notification;
