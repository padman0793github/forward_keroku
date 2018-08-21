const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var request = require('request')
var fs = require('fs');
var http = require('http');

var zlib = require('zlib');

var app = express();
app.use(express.static('./public'));

app.use(express.static('./public'));//static pages like html

//anything else
app.get('*', function (req, res) {
  var key = req.headers['X-API-Key']

  var options = {
    url: req.url.substring(1),
    headers: {
      'X-API-Key': key
    },
    encoding: null,    
  };
  request(options, function(err, response, body){
      res.send(body);
  });
  console.log(getDateTime() + " :" + req.headers['x-forwarded-for'] + " :path=" + req.url);
});

app.listen(PORT, function() { console.log('listening')});//starts server

function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;
}