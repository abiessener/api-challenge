// products.router.js
// handles /products routes

const express = require('express');
const router = express.Router();
const path = require('path');
const ApiService = require('../services/api.service');

// TODO: figure out how to do singleton services in Node
const apiService = new ApiService();

/**
 * returns a JSON response with product information
 */
router.get('/:productId', function(req, res) {
  let productTitle = '';

  // call api service to look up product name (which will eventually check cache)
  let response = apiService.getProductTitle(req.params.productId);
  // .then((response) => {
  //   responseData = JSON.parse(response.data);
  //   productTitle = responseData.product.item.product_description.title;
    
  //   const productPricingJson = pricingService.getPricingJson(productTitle);

  //   res.send(productPricingJson);

  // }).catch(() => {
  //   res.send(404);
  // });
  // // call pricing service to look up pricing data
  // validate pricing data
  //   ^ returns as json
});

router.get('/*', function(req, res) {
  console.log('404 : ', req.params);
  res.sendStatus(404);
});

module.exports = router;
