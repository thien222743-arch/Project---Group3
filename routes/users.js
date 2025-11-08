// routes/users.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Các API user
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/profile', userController.viewProfile);
router.put('/profile', userController.updateProfile);
router.post('/logout', userController.logout);

module.exports = router;
