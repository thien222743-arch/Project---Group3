const multer = require('multer');

// Lưu tạm vào memory trước khi upload Cloudinary
const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = upload;
