const http = require('http');

const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlresponses.js');
const dataHandler = require('./dataresponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/random-char.html': htmlHandler.getRandomCharResponse,
  '/search-char.html': htmlHandler.getNamedCharResponse,
  '/default-styles.css': htmlHandler.getCSSResponse,
  '/submit.html': htmlHandler.getSubmitCharResponse,
  '/admin.html': htmlHandler.getAdminResponse,
  '/random-char': dataHandler.getRandomChar,
  '/search-char': dataHandler.getNamedChar,
  '/submit-char': dataHandler.submitChar,
  notFound: htmlHandler.get404Response,
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const { pathname } = parsedUrl;
  const params = query.parse(parsedUrl.query);
  const { name } = params;
  let acceptedTypes = request.headers.accept && request.headers.accept.split(',');
  acceptedTypes = acceptedTypes || [];

  if (urlStruct[pathname]) {
    urlStruct[pathname](request, response, name, acceptedTypes);
  } else {
    urlStruct.notFound(request, response);
  }
};

http.createServer(onRequest).listen(port);
console.log(`Listening on 127.0.0.1: ${port}`);