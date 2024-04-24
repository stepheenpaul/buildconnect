const cloudinary = require('cloudinary').v2;

const cloudinaryUpload = async (data) => {
  // upload image here
  return await cloudinary.uploader.upload(data.path);
}

module.exports = cloudinaryUpload;