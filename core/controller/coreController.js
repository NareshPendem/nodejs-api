'use strict';
const path = require('path');
const uuid = require('uuid');
const axios = require('axios');
const winston = require('../../config/winston');
const nodeEval = require('node-eval');
const responseParser = require('../parser/responseParser');
const appUtils = require('../util/appUtils');

var cron = require('node-cron');
// var appDir = path.dirname(require.main.filename);
// var uniqueID = uuid.v4();
var task_scheduled = cron.schedule('*/60 * * * * *', () => {

  axios.get(appUtils.getApiUrlToConsume())
    .then(response => {
      const respObj = responseParser.apiResponseToFormattedLogObject(response);
      var size = 1;// TODO : Dealing only with single ticker ETH/BTC.

      var data = appUtils.getFormattedTimeStamp();
      var key = "timestamp";

      console.log("total size-->" + size + "--date : " + data);
      var json = "{ ";
      json += "\"" + respObj.symbol + "\" : \"" + respObj.price + "\",";
      json += "\"" + key + "\" : \"" + data + "\"";
      json += " }";
      const obj = nodeEval(json, 'my.json');
      winston.warn(obj);
    }).catch(error => {
      console.log(error);
    });

}, {
    scheduled: false
  });

// Starts the job to consume Exchange API and log Token Price to file.
exports.api_start = function(req, res) {
  try{
    task_scheduled.start();
  const respObj = {
    info : "task got started"
  }
  res.json(respObj);
}catch(err){
  const respObj = {
    info : "task got started"
  }
  res.json(respObj);
}
};

// Stops the running job logging Exchange API and log Token Price to file.
exports.api_stop = function(req, res) {
    try{
      task_scheduled.stop();
    const respObj = {
      info : "task got stopped"
    }
    res.json(respObj);
  }catch(err){
    const respObj = {
      info : "task got stopped"
    }
    res.json(respObj);
  }
};