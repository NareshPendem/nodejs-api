'use strict';
const express = require('express');
const router = express.Router();
var path = require('path');
var coreController = require('../controller/coreController');

router.get('/home', (req, res) => {
  var appDir = path.dirname(require.main.filename);
  res.sendFile(appDir+"/index.html");
});

router.get('/start/152179',coreController.api_start);
router.get('/stop/152179',coreController.api_stop);


module.exports = router;
