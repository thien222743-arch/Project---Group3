const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { uploadAvatar } = require('../controllers/avatarController');

// POST /api/avatar/upload
router.post('/upload', upload.single('avatar'), uploadAvatar);

module.exports = router;
