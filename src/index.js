//  require all the neccesary components
const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlresponses.js');
const dataHandler = require('./dataresponses.js');
const mediaHandler = require('./mediaresponses.js');

//  set up port to be hosted on
const port = process.env.PORT || process.env.NODE_PORT || 3000;

//  set up different URL endpoints
const urlStruct = {
  '/': htmlHandler.getHomeResponse,
  '/random-char.html': htmlHandler.getRandomCharResponse,
  '/search-char.html': htmlHandler.getNamedCharResponse,
  '/default-styles.css': htmlHandler.getCSSResponse,
  '/submit.html': htmlHandler.getSubmitCharResponse,
  '/admin.html': htmlHandler.getAdminResponse,
  '/random-char': dataHandler.getRandomChar,
  '/search-char': dataHandler.getNamedChar,
  '/all-char': dataHandler.getAllChar,
  '/submit-char': dataHandler.submitChar,
  '/delete-char': dataHandler.deleteChar,
  '/dnd-logo': mediaHandler.getImage,
  '/error': htmlHandler.get404Response,
  notFound: htmlHandler.get404Response,
};

//  combines all the seperate posted contents
const handlePost = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/submit-char') {
    const body = [];

    request.on('error', (err) => {
      console.dir(err);
      response.statusCode = 400;
      response.end();
    });

    request.on('data', (chunk) => {
      body.push(chunk);
    });

    request.on('end', () => {
      const bodyString = Buffer.concat(body).toString();
      const bodyParams = query.parse(bodyString);
      dataHandler.submitChar(request, response, bodyParams);
    });
  }
};

//cobines all the seperate content that needs to be deleted into a code readable format
const handleDelete = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/delete-char') {
    const body = [];

    request.on('error', (err) => {
      console.dir(err);
      response.statusCode = 400;
      response.end();
    });

    request.on('data', (chunk) => {
      body.push(chunk);
    });

    request.on('end', () => {
      const bodyString = Buffer.concat(body).toString();
      const bodyParams = query.parse(bodyString);
      dataHandler.deleteChar(request, response, bodyParams);
    });
  }
};

//  server response to being accessed
const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const { pathname } = parsedUrl;
  const params = query.parse(parsedUrl.query);
  const { name } = params;
  let acceptedTypes = request.headers.accept && request.headers.accept.split(',');
  acceptedTypes = acceptedTypes || [];

  if (request.method === 'POST') {
    handlePost(request, response, parsedUrl);
    return;
  }
  if (request.method === 'DELETE') {
    handleDelete(request, response, parsedUrl);
    return;
  }

  if (urlStruct[pathname]) {
    urlStruct[pathname](request, response, acceptedTypes, name);
  } else {
    urlStruct.notFound(request, response);
  }
};

//  creates the server to run on
http.createServer(onRequest).listen(port);
console.log(`Listening on 127.0.0.1: ${port}`);