const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;
const clientDir = path.join(__dirname, '..', 'client');
const nodemodules = path.join(__dirname, '..', 'node_modules');

const verificationKey = process.env.verificationKey;
const apiRouter = require('./router.js');

app.use('/', express.static(clientDir));
app.use('/', express.Router().get('/riot.txt', (req, res) => { res.send(verificationKey) }))

app.use('/src', express.static(nodemodules));

app.use('/api', apiRouter);

app.listen(port, () => { console.log('listening on', port) });