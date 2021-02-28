const fs = require('fs');

const dndLogo = fs.readFileSync(`${__dirname}/../client/dndlogo.png`);

const getImage = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'image/png' });
  response.write(dndLogo);
  response.end();
};

module.exports = {
  getImage,
};
