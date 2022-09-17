const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { signatureVerify } = require('../utils/signatureVerify');

const router = express.Router();

router.post('/login', signatureVerify, authController.login);
router.get('/logout', authController.logout);

router.use(authController.protect);
router.route('/me').get(userController.getMe);

router.use(authController.accessOnly('admin'));
router.route('/').get(userController.getAllUsers);

module.exports = router;
