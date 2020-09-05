const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messageQueue = require('./messageQueue');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////
// let messageQueue = null;
// module.exports.initialize = (queue) => {
//   messageQueue = queue;
// };

module.exports.router = (req, res, next = ()=>{}) => {
  // console.log('Serving request type ' + req.method + ' for url ' + req.url);
  res.writeHead(200, headers);
  //if req.method equals 'Options', then res.end is empty
  if (req.method === 'OPTIONS') {
    res.end();
    // else if, req.method equals 'Get'
  } else if (req.method === 'GET') {
    // const directions = ['up', 'down', 'left', 'right']
    // const result = Math.floor(Math.random() * directions.length)

    //dequeue message from messages array and pass into res.end
    const result = messageQueue.dequeue();
    if (result) {
      res.end(result);
    } else {
      res.end('Queue Empty');
    }
  } else if (req.method === 'POST') {
    //if there is a file, set to background
    // console.log(req)
    let body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body);
      // at this point, `body` has the entire request body stored in it as a string
      let backgroundImage = multipart.getFile(body);
      // fs.writeFile(backgroundImageFile, )
      console.log(body)
      fs.writeFile('./background.jpg', backgroundImage.data, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
      res.end();





    });

    // let newFile = multipart.getFile(newBuffer);
    // console.log(newFile)

    // if () {
    // //  respond with a 200 status
    // res.writeHead(200, headers);

    // }else {//Otherwise
    // //  respond with a 404 status
    // res.writeHead(404, headers);
    // }
  }
  next(); // invoke next() at the end of a request to help with testing!
};
