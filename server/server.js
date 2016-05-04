const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;
const clientDir = path.join(__dirname, '..', 'client');
const angularDir = path.join(__dirname, '..', 'node_modules', 'angular');

const apiRouter = require('./router.js');

app.use(morgan('dev'));
app.use('/', express.static(clientDir));

app.use('/src/angular', express.static(angularDir));

app.use('/api', apiRouter);

app.listen(port, () => { console.log('listening on', port) });