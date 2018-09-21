'use strict';
const express = require('express');
const router = express.Router();
var path = require('path');
var coreController = require('../controller/coreController');


router.post('/one',coreController.api_one);

router.get('/two',coreController.api_two);

router.get('/home', (req, res) => {
  var appDir = path.dirname(require.main.filename);
  console.log("appDIR in ROuter"+appDir);
  res.sendFile(appDir+"/index.html");
});

module.exports = router;
