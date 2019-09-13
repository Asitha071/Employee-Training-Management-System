const mongoose = require('mongoose');

//USer schema
const UserSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },

  last_name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  username: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  }

/*  user_designation: {
    type: String,
    required: true

  },
*/
});

const User = module.exports = mongoose.model('User', UserSchema);
