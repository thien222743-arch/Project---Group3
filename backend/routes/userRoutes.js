const express = require('express');
const router = express.Router();
const { signup, login, viewProfile, updateProfile } = require('../controllers/userController');

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', viewProfile);
router.put('/profile', updateProfile);

module.exports = router;
