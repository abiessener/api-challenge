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
router.get('/:productId', (req, res) => {
  // todo: make product class definition
  let product = {
    title: '',
    current_price: {},
    id: req.params.productId
  };

  // call api service to look up product name (which will eventually check cache)
  apiService.getProduct(product.id).then((response) => {
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
    res.sendStatus(response.statusCode);
  });
});

router.put('/:productId', (req, res) => {
  const product = req.body;
  // todo: validate data

  pricingService.updatePrice(product).then((databaseResponse) => {
    res.sendStatus(200);
  }).catch((databaseResponse) => {
    res.sendStatus(databaseResponse);
  });
});

/**
 * Upserts the data from the API into our local database. Returns 200 if found, 404 if not.
 */
router.post('/:productId', (req, res) => {
  let product = {
    title: '',
    current_price: {},
    id: req.params.productId
  };

  // todo: validate data
  apiService.getProduct(product.id).then((response) => {
    // todo: refactor into mapping function
    // todo: get actual pricing data
    product.title = response.product.item.product_description.title;
    // random prices lol
    product.current_price.value = Math.random() * 100;
    product.current_price.currency_code = 'USD';  

    pricingService.upsertProduct(product).then((databaseResponse) => {
      res.sendStatus(200);
    }).catch((databaseResponse) => {
      res.sendStatus(databaseResponse);
    });
  }).catch((response) => {
    res.sendStatus(response.statusCode);
  });


});

router.get('/*', (req, res) => {
  // console.log('/products 404 : ', req.params);
  res.sendStatus(404);
});

module.exports = router;
