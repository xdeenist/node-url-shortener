const express = require('express')
const router = express.Router();
const {MinifiedUrls} = require('../helpers/db')

// routes
router.get('/:alias', redirect);

module.exports = router

async function redirect(req, res, next) {
  const alias = req.params.alias;
  const url = await MinifiedUrls.findOne({ alias });

  const views = url.views += 1
  await MinifiedUrls.findOneAndUpdate({_id: url.id}, {$set: {"views": views}});

  res.redirect(url ? url.originalUrl : 'google.com');
}
