//  all requires
const fs = require('fs');

//  load in the image
const dndLogo = fs.readFileSync(`${__dirname}/../client/dndlogo.png`);

//  gets the image to be displayed
const getImage = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'image/png' });
  response.write(dndLogo);
  response.end();
};

//  exports functions
module.exports = {
  getImage,
};
