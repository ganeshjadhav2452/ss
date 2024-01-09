const multer = require('multer')

// Multer setup for file upload


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


module.exports = upload