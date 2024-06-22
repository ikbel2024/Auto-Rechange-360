const multer = require('multer');
const path = require('path');
const fs = require('fs-extra'); // For handling file deletion

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads/profile_photos'; // Customize upload path
    fs.ensureDir(uploadPath, err => { // Create directory if it doesn't exist
      if (err) return cb(err);
      cb(null, uploadPath);
    });
  },
  filename: (req, file, cb) => {
    const userId = req.user._id; // Assuming you have `req.user` set
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    cb(null, `${userId}-${uniqueSuffix}`);
  }
});

const upload = multer({ storage });

module.exports = upload;