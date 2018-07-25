var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Mongoose Schema
var PricingSchema = new Schema({
    title: {type: String, required: true},
    price: {type: String, required: true}
  },
  {
    collection: 'Pricing'
  });

module.exports = mongoose.model('Pricing', PricingSchema);
