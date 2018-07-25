const Pricing = require('../models/pricing.schema');

module.exports = class PricingService {
  getPricingJson(productTitle) {
    result = '';

    try {
      Pricing.find({
        title: productTitle
      }, (err, data) => {
        if (err) {
          // TODO: get rid of hard-coded error messaging
          throw new Error('database error in ' + __filename);
        }

        result = data.price;
      });
    } catch (error) {
      result = error;
    }

    return result;
  }
}