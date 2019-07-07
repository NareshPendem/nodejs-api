'use strict';
const express = require('express');
const router = express.Router();
var path = require('path');
var coreController = require('../controller/coreController');


router.get('/one',coreController.api_one);// TODO : Remove.
router.get('/two',coreController.api_two);// TODO : Remove.

router.get('/home', (req, res) => {
  var appDir = path.dirname(require.main.filename);
  console.log("appDIR in ROuter"+appDir);
  res.sendFile(appDir+"/index.html");
});

router.get('/start/152179',coreController.api_start);
router.get('/stop/152179',coreController.api_stop);


module.exports = router;
