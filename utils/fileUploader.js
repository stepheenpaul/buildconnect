const cloudinary = require('cloudinary').v2;

const cloudinaryFileUploader = async (data, dataType) => {
  console.log(data, dataType)
    return await cloudinary.uploader.upload(data.path, { resource_type: "auto" });

}

module.exports = cloudinaryFileUploader;