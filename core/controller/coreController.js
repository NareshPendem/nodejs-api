'use strict';
const path = require('path');
const uuid = require('uuid');
const axios = require('axios');
var cron = require('node-cron');

var cron = require('node-cron');

var task = cron.schedule('* * * * * *', () =>  {
  console.log('task running');
}, {
  scheduled: false
});

exports.api_start = function(req, res) {
  try{
  task.start();
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
    task.stop();
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

      axios.get('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => {
      console.log(response.data.userId);
      console.log(response.data.title);
      res.json(response.data);
    })
    .catch(error => {
      console.log(error);
    });

    console.log("UUID : "+uniqueID);

    //  var jsonString = JSON.stringify(req.body);

};


exports.api_two = function(req, res) {
  var respJSON = {};
  var appDir = path.dirname(require.main.filename);
  console.log("Inside GET request");
  //var uID = req.params.id;
  var resp = "api_two";
  const respObj = {
      key: resp
  }
  res.json(respObj);

};
