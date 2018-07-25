// products.router.js
// handles /products routes

const express = require('express');
const router = express.Router();
const path = require('path');
const ApiService = require('../services/api.service');
const PricingService = require('../services/pricing.service');

// TODO: figure out how to do singleton services in Node
const apiService = new ApiService();
const pricingService = new PricingService();

/**
 * returns a JSON response with product information
 */
router.get('/:productId', function(req, res) {
  let productTitle = '';

  // call api service to look up product name (which will eventually check cache)
  let response = apiService.getProductTitle(req.params.productId);

  response.then((response) => {
    productTitle = response.product.item.product_description.title;
    pricingService.sendPricingJson(productTitle, res);
  });
});

router.get('/*', function(req, res) {
  // console.log('/products 404 : ', req.params);
  res.sendStatus(404);
});

module.exports = router;
