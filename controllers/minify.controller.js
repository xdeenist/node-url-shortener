const express = require('express')
const router = express.Router();
const minifyService = require("../services/minify.service")
const throttle = require("express-throttle");
const {checkApiToken} = require("../middlewares/api-token")

// routes
router.post('/create/:token?', [checkApiToken, throttle({"burst": 5, "period": "1s"})], create);

module.exports = router

function create(req, res, next) {
  const body = req.body;
  minifyService.create(body, res)
    .then(minifiedUrl => res.json({
      message: 'url has been created',
      // data: minifiedUrl,
      url: `${minifiedUrl.baseUrl}/r/${minifiedUrl.alias}`
    }))
    .catch(err => {
      console.error(err);
      next(err);
    });
}

