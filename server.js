const express = require('express');
const http = require('http');
const routes = require('./routes');

const app = express();

app.use('/stream', routes.streamingRoute);
app.use('/metadata', routes.metadataRoute);


module.exports = app;