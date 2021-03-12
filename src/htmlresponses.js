//  all requires
const fs = require('fs');

//  loads all the required html and css files
const errorPage = fs.readFileSync(`${__dirname}/../client/error.html`);
const cssPage = fs.readFileSync(`${__dirname}/../client/default-styles.css`);
const randomCharPage = fs.readFileSync(`${__dirname}/../client/random-char.html`);
const searchCharPage = fs.readFileSync(`${__dirname}/../client/search-char.html`);
const submitPage = fs.readFileSync(`${__dirname}/../client/submit.html`);
const adminPage = fs.readFileSync(`${__dirname}/../client/admin.html`);
const homePage = fs.readFileSync(`${__dirname}/../client/index.html`);

//  sends to error page
const get404Response = (request, response) => {
  response.writeHead(404, { 'Content-Type': 'text/html' });
  response.write(errorPage);
  response.end();
};

//  sends to default css page
const getCSSResponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(cssPage);
  response.end();
};

//  sends to random character page
const getRandomCharResponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(randomCharPage);
  response.end();
};

//  sends to named character page
const getNamedCharResponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(searchCharPage);
  response.end();
};

//  sends to submit character page
const getSubmitCharResponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(submitPage);
  response.end();
};

//  sends to admin page
const getAdminResponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(adminPage);
  response.end();
};

//  sends to app home page
const getHomeResponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(homePage);
  response.end();
};

//  exports functions
module.exports = {
  get404Response,
  getCSSResponse,
  getRandomCharResponse,
  getNamedCharResponse,
  getSubmitCharResponse,
  getAdminResponse,
  getHomeResponse,
};
