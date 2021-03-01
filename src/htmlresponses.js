const fs = require('fs');

const errorPage = fs.readFileSync(`${__dirname}/../client/error.html`);
const cssPage = fs.readFileSync(`${__dirname}/../client/default-styles.css`);
const randomCharPage = fs.readFileSync(`${__dirname}/../client/random-char.html`);
const searchCharPage = fs.readFileSync(`${__dirname}/../client/search-char.html`);
const submitPage = fs.readFileSync(`${__dirname}/../client/submit.html`);
const adminPage = fs.readFileSync(`${__dirname}/../client/admin.html`);
const homePage = fs.readFileSync(`${__dirname}/../client/index.html`);

const get404Response = (request, response) => {
  response.writeHead(404, { 'Content-Type': 'text/html' });
  response.write(errorPage);
  response.end();
};

const getCSSResponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(cssPage);
  response.end();
};

const getRandomCharResponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(randomCharPage);
  response.end();
};

const getNamedCharResponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(searchCharPage);
  response.end();
};

const getSubmitCharResponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(submitPage);
  response.end();
};

const getAdminResponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(adminPage);
  response.end();
};

const getHomeResponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(homePage);
  response.end();
};

module.exports = {
  get404Response,
  getCSSResponse,
  getRandomCharResponse,
  getNamedCharResponse,
  getSubmitCharResponse,
  getAdminResponse,
  getHomeResponse,
};
