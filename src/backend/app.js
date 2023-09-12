const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const routes = require('./routes/routes.js');

app.use('/', routes);

app.listen(port, () => console.log(`Server listening on port ${port}`));