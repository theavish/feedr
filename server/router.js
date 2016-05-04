const router = require('express').Router();
const jsonparser = require('body-parser').json();

router.get('/test', (req, res) => { res.send('success'); });

router.get('/lookup/:name', jsonparser, lookupByName);

module.exports = router;

function lookupByName(req, res) {
  console.log(req.params)
}