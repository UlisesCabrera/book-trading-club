var express = require('express');
var router = express.Router();
var profileController = require('../controllers/profile.server.controller');

router.put('/accept',  profileController.acceptRequest);
router.put('/decline',  profileController.declineRequest);
router.put('/cancel',  profileController.cancelRequest);

module.exports = router;