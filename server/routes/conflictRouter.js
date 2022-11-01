const express = require('express');
const authController = require('../controllers/authController');
const conflictController = require('../controllers/conflictController');

const router = express.Router();

router.use(authController.protect);
router.post('/:roomId', conflictController.createConflict);
router.post('/message/:conflictId', conflictController.sendMessage);
router.get('/message/:conflictId', conflictController.allMessages);
router.use(authController.accessOnly('admin', 'moderator'));
router.get('/', conflictController.getAllConflicts);

module.exports = router;
