const Pricing = require('../models/pricing.schema');

/**
 * @class PricingService
 * 
 * Service for interacting with price database.
 */
module.exports = class PricingService {

  /**
   * Sends the pricing data for the passed product title, or a 500 on db error, or a 404 if no data found.
   * 
   * 
   * @param {string} productTitle 
   * @param {ServerResponse} res 
   */
  sendPricingJson(productTitle, res) {
    try {
      Pricing.findOne({
        'title': productTitle
      }, (err, data) => {
        if (err) {
          throw new Error('database error in ' + __filename);
        }

        if (data.current_price) {
          res.send(data.current_price);
        } else {
          res.sendStatus(404);
        }
      });
    } catch (error) {
      res.sendStatus(500);
    }
  }

  /**
   * Returns a promise that resolves with the data, or rejects with an appropriate HTTP response code.
   * 
   * @param {string} productTitle 
   */
  getPricingData(productTitle) {
    return new Promise((resolve, reject) => {
      try {
        Pricing.findOne({
          'title': productTitle
        }, (err, data) => {
          if (err) {
            throw new Error('database error in ' + __filename);
          }
  
          if (data) {
            resolve(data.current_price);
          } else {
            reject(404);
          }
        });
      } catch (error) {
        reject(500);
      }
    });
  }
};