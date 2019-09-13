let mongoose = require('mongoose');

let peopleSchema = mongoose.Schema({
  trainee:{
    type: String,
    required: true
  }
 });


let People = module.exports = mongoose.model('People', peopleSchema);
