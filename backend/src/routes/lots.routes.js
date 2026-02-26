const express = require('express');
const router = express.Router();
const lotsController = require('../controllers/lots.controller');
const auth = require('../middleware/auth');

router.get('/', lotsController.getAllLots);
router.get('/:id', lotsController.getLotById);
router.put('/:id', auth, lotsController.updateLot);

module.exports = router;
