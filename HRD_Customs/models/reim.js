let mongoose = require('mongoose');


//people Schema
let peopleSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
 }});

 let Assign = module.exports = mongoose.model('Assign', peopleSchema);
