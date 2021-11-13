const express = require('express');
const routes = require('./routes');

//Initialize server and set up routers
const app = express();
app.use('/stream', routes.streamingRoute);
app.use('/metadata', routes.metadataRoute);

//Start
app.listen(8000, () => {
  console.log('Client listening at port 8000');
})