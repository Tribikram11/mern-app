const express = require('express');
const router = express.Router();
const {register, login, refresh, logout, getUser} = require('../controllers/authController')
const {protect} = require('../middleware/authMiddleware')

router.post('/register', register)
router.post('/login', login)
router.post('/refresh', refresh)
router.post('/logout', logout)
router.get('/me', protect, getUser)

module.exports = router;