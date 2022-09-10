const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

//TODO: add user auth
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router.route('/:id').get(userController.getUser);

module.exports = router;
