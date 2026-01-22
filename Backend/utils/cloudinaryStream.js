// utils/cloudinaryStream.js
const cloudinary = require("../config/cloudinary");

const uploadStream = (buffer, options) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      },
    );
    stream.end(buffer);
  });

module.exports = uploadStream;
