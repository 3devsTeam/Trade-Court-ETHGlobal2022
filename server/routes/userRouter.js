const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { signatureVerify } = require('../utils/signatureVerify');

const router = express.Router();

router.post('/login', signatureVerify, authController.login);
router.get('/logout', authController.logout);

router.use(authController.protect);
router.use(authController.accessOnly('admin'));

router.route('/').get(userController.getAllUsers);

router.route('/:id').get(userController.getUser);

module.exports = router;
