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
  let product = {
    title: '',
    current_price: {},
    id: req.params.productId
  };

  // call api service to look up product name (which will eventually check cache)
  apiService.getProductTitle(product.id).then((response) => {
    product.title = response.product.item.product_description.title;
    // pricingService.sendPricingJson(productTitle, res);
    pricingService.getPricingData(product.title).then((pricingData) => {
      product.current_price = pricingData;
      productJson = JSON.stringify(product);
      res.send(productJson);
    }).catch((response) => {
      res.sendStatus(500);
    });
  }).catch((response) => {
    res.sendStatus(500);
  });
});

router.put('/:productId', function(req, res) {
  const product = req.body;
  // todo: validate data

  pricingService.updatePrice(product).then((databaseResponse) => {
    res.send(200);
  }).catch((databaseResponse) => {
    res.sendStatus(databaseResponse);
  });
});

router.get('/*', function(req, res) {
  // console.log('/products 404 : ', req.params);
  res.sendStatus(404);
});

module.exports = router;
