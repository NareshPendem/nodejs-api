'use strict';
var path = require('path');
var uuid = require('uuid');

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

exports.api_one = function(req, res) {


    var uniqueID = uuid.v4();

    console.log("UUID : "+uniqueID);

    //  var jsonString = JSON.stringify(req.body);

      var resp = "api_one";
      const respObj = {
          key: resp
      }
      res.json(respObj);
};
