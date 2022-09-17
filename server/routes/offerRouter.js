const express = require('express');
const authController = require('../controllers/authController');
const offerController = require('../controllers/offerController');
const roomController = require('../controllers/roomController');

const router = express.Router();

router.get('/', offerController.getAllOffers);

router.use(authController.protect);
router.post('/', offerController.createOffer);
router.get('/:id', offerController.getOffer);
router.post('/:id', offerController.joinOffer);
router.put('/:id', offerController.leaveOffer);
router.delete('/:id', offerController.deleteOffer);
router.get('/:id/send', roomController.takerSent);
router.get('/:id/receive', roomController.makerRecieved);
router.get('/:id/claim', roomController.takerClaimed);

module.exports = router;
