let mongoose = require('mongoose');



//foreign_detail Schema
let local_detailSchema = mongoose.Schema({
  s_no:{
    type: String,
    required: true

   },

  type:{
    type: String,
    required: true
   },

  program_name:{
    type: String,
    required: true
   },

  file_num:{
    type: String,
    required: true
   },

  custom_trainees:{
    type: String,
    required: true
   },

  other_trainees:{
   type: String,
   required: true
   },

  benefitted:{
   type: String,
   required: true
   },

   cost:{
    type: String,
    required: true
    },

   voted:{
    type: String,
    required: true
  },

  comment:{
   type: String,
   required: true
 }



});

let Local = module.exports = mongoose.model('Local', local_detailSchema);
