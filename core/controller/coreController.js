'use strict';
const path = require('path');
const uuid = require('uuid');
const axios = require('axios');
const winston = require('../../config/winston');
const nodeEval = require('node-eval');
const responseParser = require('../parser/responseParser');
const appUtils = require('../util/appUtils');

var cron = require('node-cron');

 // TODO : Clean Up Required.

// var task = cron.schedule('* * * * * *', () =>  {

//   axios.get(appUtils.getApiUrlToConsume())
//   .then(response => {
//     winston.info(responseParser.apiResponseToFormattedLogObject(response));
//   })

// }, {
//   scheduled: false
// });


// var task_allTokens = cron.schedule('*/60 * * * * *', () =>  {

//   axios.get('https://api.binance.com/api/v3/ticker/price')
//   .then(response => {

//     var size = response.data.length;

//       timestamp.utc('ss')

//   var data = timestamp.utc('YYYY')+"-"+timestamp.utc('MM')+"-"+timestamp.utc('DD')+"-"+
//   timestamp.utc('HH')+"-"+timestamp.utc('mm')+"-"+timestamp.utc('ss');

//     var key = "timestamp";

//     console.log("total size-->"+size+"--date : "+data);
//      var json = "{ ";
//     // json += "\"" + key + "\" : \"" + data + "\",";
//     for (var i=0; i<size; i++) {
//       if((i+1) != size && (response.data[i].symbol.indexOf("BTC") != -1 ||
//     response.data[i].symbol.indexOf("USDT") != -1) ){
//       (i + 1) == size ? json += "\"" + response.data[i].symbol + "\" : \"" + response.data[i].price + "\"" : json += "\"" + response.data[i].symbol + "\" : \"" + response.data[i].price + "\",";
//       } else if ((i+1 == size)){
//         // Add of timestamp to end of the JSON.
//       (i + 1) == size ? json += "\"" + key + "\" : \"" + data + "\"" : json += "\"" + response.data[i].symbol + "\" : \"" + response.data[i].price + "\",";
//     }
//   }
//   json += " }";
//   const obj = nodeEval(json, 'my.json');

//   winston.warn(obj);
//   }).catch(error => {
//     console.log(error);
//   });

// }, {
//   scheduled: false
// });


var task_scheduled = cron.schedule('*/60 * * * * *', () => {

  axios.get(appUtils.getApiUrlToConsume())
    .then(response => {
      const respObj = responseParser.apiResponseToFormattedLogObject(response);
      var size = 1;// TODO : Dealing only with single ticker ETH/BTC.

      var data = appUtils.getApiUrlToConsume();
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



exports.api_one = function(req, res) {

    var uniqueID = uuid.v4();

  axios.get(appUtils.getApiUrlToConsume())
    .then(response => {

      const respObj = responseParser.apiResponseToFormattedLogObject(response);

      console.log("Formated Resp log ->",respObj);
      //res.json(response.data);
      winston.info(respObj);
    })
    .catch(error => {
      console.log(error);
    });
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
