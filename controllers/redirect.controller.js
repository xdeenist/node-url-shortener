const express = require('express')
const router = express.Router();
const {MinifiedUrls} = require('../helpers/db')
const throttle = require("express-throttle");

// routes
router.get('/:alias', throttle({ "burst": 5, "period": "1s" }), redirect);

module.exports = router

async function redirect(req, res, next) {
  const alias = req.params.alias;
  const url = await MinifiedUrls.findOne({ alias });
  console.log(`Redirect by alias ${alias}`);
  const views = url.views += 1
  await MinifiedUrls.findOneAndUpdate({_id: url.id}, {$set: {"views": views}});

  res.status(301).redirect(url ? `http://${url.originalUrl}` : 'https://google.com');
}
