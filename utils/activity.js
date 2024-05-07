const { Notification } = require("../models/notification");


module.exports = {
  userNotifications: async (title, description, recipient, notification_type) => {

    let newNotification = new Notification({
      user: user._id,
      title,
      description,
      recipient: recipient._id,
      notification_type
    });

    await newNotification.save();

    recipient.notifications.push(newNotification._id);
    await recipient.save();
  },

  adminNotifications: async (title, description, recipient, notification_type) => {
  
    let newNotification = new Notification({
      user: user._id,
      title,
      description,
      recipient: recipient._id,
      notification_type
    });

    await newNotification.save();
  }
}