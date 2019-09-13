const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

//Bring in User Models
let User = require('../models/reim');

//Register Form
//Add Foreign detail Route
router.get('/add', function(req, res){
  res.render('reimb',{
    title: 'Add Reimbursement details'
  });
});


module.exports = router;
