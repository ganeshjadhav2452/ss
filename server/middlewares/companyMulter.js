const multer = require('multer')
const fs = require('fs');
const path = require('path');

const uploadDir = 'images/company_logo';

// Create the directory if it doesn't exist
fs.mkdirSync(uploadDir, { recursive: true }, (err) => {
  if (err) {
    console.error('Error creating directory:', err);
  } else {
    console.log('Directory is created');
  }
});

// Set up Multer storage for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/company_logo'); // Save uploaded files to the 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Rename file to avoid duplicates
  },
});

const upload = multer({ storage: storage });

module.exports = upload