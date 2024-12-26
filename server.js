'use strict';

import './websocket.js';

import express from 'express';
import formidable from 'formidable';

const server = express();

server.use(express.static('public', {
    extensions: ['html']
}));

const init = () => {
    server.listen(80, err => console.log(err || 'HTTP-webserver is running'));
}

init();