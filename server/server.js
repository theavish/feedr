const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;
const clientDir = path.join(__dirname, '..', 'client');

app.use(morgan('dev'));
app.use('/', express.static(clientDir));

app.listen(port, () => { console.log('listening on', port) });