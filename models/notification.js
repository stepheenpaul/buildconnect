const mongoose = require("mongoose");
const { Schema, model } = mongoose;

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
    type: Schema.Types.ObjectId,
    ref: "user",
  },

// bid_interest, bid_invite bid_request_received, bid_submitted, bid_accepted
  notification_type: {
    type: String,
    required: true,
  },

  read: {
    type: Boolean,
    default: false,
  },
  
}, {timestamps: true});

module.exports = { Notification: model("notification", notificationSchema) };
