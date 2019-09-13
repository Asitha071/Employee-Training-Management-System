 let mongoose = require('mongoose');


 //foreign_detail Schema
 let foreign_detailSchema = mongoose.Schema({
   date:{
     type: String,
     required: true

    },

   file_name:{
     type: String,
     required: true
    },

   program_name:{
     type: String,
     required: true
    },

   start_date:{
     type: String,
     required: true
    },

   end_date:{
     type: String,
     required: true
    },



   country:{
    type: String,
    required: true
    },

   funds:{
    type: String,
    required: true
    },

    amounts:{
     type: String,
     required: true
     },

    travels:{
     type: String,
     required: true
   }


 });

 let Foreign = module.exports = mongoose.model('Foreign', foreign_detailSchema);
