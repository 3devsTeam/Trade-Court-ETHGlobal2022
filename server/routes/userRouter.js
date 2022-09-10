const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { signatureVerify } = require('../utils/signatureVerify');

const router = express.Router();

//TODO: add user auth
router.post('/login', signatureVerify, authController.login);

router.route('/').get(userController.getAllUsers);

router.route('/:id').get(userController.getUser);

module.exports = router;
