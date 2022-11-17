const express = require('express');
const chatController = require('../controllers/chatController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

// router.get('/', chatController.getAllChats);
// router.post('/', chatController.createChat);

router.get('/:id', chatController.getChat);
// router.post('/:id', chatController.joinChat);
// router.delete('/:id', chatController.deleteChat);

router.post('/message/:id', chatController.sendMessage);

module.exports = router;
