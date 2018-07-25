// products.router.js
// handles /products routes

var express = require('express');
var router = express.Router();
var path = require('path');

// Handle index file separately
// Also catches any other request not explicitly matched elsewhere
router.get('/:productId', function(req, res) {
  // call api service to look up product name (which will eventually check cache)
  const productName = ApiService.getProductName(req.params.productId);
  // call pricing service to look up pricing data
  // validate pricing data
  //   ^ returns as json
  let productPricingJson = PricingService.getPricingJson(productName);
  res.send(productPricingJson);
});

router.get('/*', function(req, res) {
  console.log('404 : ', req.params);
  res.sendStatus(404);
});

module.exports = router;
