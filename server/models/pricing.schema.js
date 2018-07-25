var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Mongoose Schema
var PricingSchema = new Schema({
    name: {type: String, required: true},
    
  },
  {
    collection: 'pricing'
  });




module.exports = mongoose.model('Pricing', PricingSchema);
