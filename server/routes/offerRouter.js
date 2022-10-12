const express = require('express');
const authController = require('../controllers/authController');
const offerController = require('../controllers/offerController');
const roomController = require('../controllers/roomController');

const router = express.Router();

router.get('/', offerController.getAllOffers);

router.use(authController.protect);
router.post('/', offerController.createOffer);
router.get('/:id', offerController.getOffer);
router.delete('/:id', offerController.deleteOffer);

router.post('/:id', roomController.joinRoom);
router.get('/:id/send', roomController.takerSent);
router.get('/:id/recieve', roomController.makerRecieved);
router.get('/:id/claim', roomController.takerClaimed);
router.put('/:id', roomController.leaveRoom);

module.exports = router;
