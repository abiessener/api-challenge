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

        if (data.price) {
          res.send(data.price);
        } else {
          res.sendStatus(404);
        }
      });
    } catch (error) {
      res.sendStatus(500);
    }
  }
}