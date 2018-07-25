var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Mongoose Schema
var PricingSchema = new Schema({
    title: {type: String, required: true},
    current_price: 
      {
        value: {type: String, required: true},
        currency_code: {type: String, required: true}
      }
  },
  {
    collection: 'Pricing'
  });

module.exports = mongoose.model('Pricing', PricingSchema);
