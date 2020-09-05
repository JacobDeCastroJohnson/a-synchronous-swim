const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  console.log(req);
  res.writeHead(200, headers);
  //if req.method equals 'Options', then res.end is empty
  if (req.method === 'OPTIONS') {
    res.end();
    // else if, req.method equals 'Get'
  } else if (req.method === 'GET') {
    res.end('HELLO');
  }
  next(); // invoke next() at the end of a request to help with testing!
};
