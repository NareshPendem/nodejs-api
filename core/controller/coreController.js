'use strict';
const path = require('path');
const uuid = require('uuid');
const axios = require('axios');
var winston = require('../../config/winston');
const nodeEval = require('node-eval');

var cron = require('node-cron');

var task = cron.schedule('* * * * * *', () =>  {

  axios.get('https://api.binance.com/api/v1/trades?symbol=BTCUSDT&limit=2')
  .then(response => {

  const respObj = {
    btc : response.data[0].price,
    qty : response.data[0].qty
  }
  winston.info(respObj);
  })

}, {
  scheduled: false
});

var task_allTokens = cron.schedule('*/15 * * * * *', () =>  {

  axios.get('https://api.binance.com/api/v3/ticker/price')
  .then(response => {

    var size = response.data.length;
    console.log("total size-->"+size);
     var json = "{ ";
    for (var i=0; i<size; i++) {
      (i + 1) == size ? json += "\"" + response.data[i].symbol + "\" : \"" + response.data[i].price + "\"" : json += "\"" + response.data[i].symbol + "\" : \"" + response.data[i].price + "\",";
    //  response.data[i].symbol: response.data[i].price
  }
  json += " }";
  const obj = nodeEval(json, 'my.json');

  winston.warn(obj);
  })

}, {
  scheduled: false
});

exports.api_start = function(req, res) {
  try{
  task_allTokens.start();
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

exports.api_stop = function(req, res) {
    try{
    task_allTokens.stop();
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



exports.api_one = function(req, res) {

    var uniqueID = uuid.v4();

      axios.get('https://api.binance.com/api/v1/trades?symbol=BTCUSDT&limit=2')
    .then(response => {

      const respObj = {
        btc : response.data[0].price,
        qty : response.data[0].qty
      }

      console.log(response.data[0].price);
      console.log(response.data[0].qty);
      res.json(response.data);
      winston.info(respObj);
    })
    .catch(error => {
      console.log(error);
    });
    //  var jsonString = JSON.stringify(req.body);

};


exports.api_two = function(req, res) {
  var respJSON = {};
  var appDir = path.dirname(require.main.filename);

  var uniqueID = uuid.v4();

    axios.get('https://api.binance.com/api/v1/klines?symbol=BTCUSDT&limit=50&interval=15m')
  .then(response => {
    console.log(response.data[0][2]);
    console.log(response.data[0][3]);
    res.json(response.data);
  })
  .catch(error => {
    console.log(error);
  });

};
