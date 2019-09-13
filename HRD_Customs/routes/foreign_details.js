const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

////Body parser middleware
// Parse application/ form- urlencoded
router.use(bodyParser.urlencoded({ extended: false}));
//Parse Application/Jason
router.use(bodyParser.json());

//Bring in  foreign detail Model
let Foreign = require('../models/foreign_detail');
let People = require('../models/people');

//assign detail
router.post('/assign', function(req,res){
req.checkBody('trainee', 'trainees are required').notEmpty();

//Get errors
  let errors = req.validationErrors();
  if(errors){
    res.render('foreign', {
      title:'Assign',
      errors:errors
    });
  } else {

    let people = new People();
    people.trainee = req.body.trainee;


    people.save(function(err){
      if(err){
        console.log(err);
        return;
      }else{
        res.render('/foreign');
      }
    });
  }
});


router.get('/assign', function(req, res){
  People.find({}, function(err, people){
    if(err){
      console.log(err);
    } else {
      res.render('foreign', {
        title:'Assign',
        people: people
      });
    }
  });
});


//show Foreign detail Route
router.get('/show', function(req, res){
  Foreign.find({}, function(err, foreign_details){
    if(err){
      console.log(err);
    } else {
      res.render('foreignhome', {
        title:'Foreign',
        foreign_details: foreign_details
      });
    }
  });
});



//Add Foreign detail Route
router.get('/add', function(req, res){
  res.render('foreign',{
    title: 'Add Foreign Detail'
  });
});


//Edit single foreign Detail
router.get('/edit/:id', function(req, res){
  Foreign.findById(req.params.id, function(err, foreign_detail){
    res.render('edit_foreign',{
      title:'Edit Foreign Detail',
      foreign_detail:foreign_detail
    });
  });
});

//update Submit POST Route
router.post('/edit/:id', function(req,res){
  let foreign_detail = {};
  foreign_detail.date = req.body.date;
  foreign_detail.file_name = req.body.file_name;
  foreign_detail.program_name = req.body.program_name;
  foreign_detail.start_date = req.body.start_date;
  foreign_detail.end_date = req.body.end_date;
  foreign_detail.country = req.body.country;
  foreign_detail.funds = req.body.funds;
  foreign_detail.amounts = req.body.amounts;
  foreign_detail.travels = req.body.travels;

  let query = {_id:req.params.id}

  Foreign.update(query, foreign_detail, function(err){
    if(err){
      console.log(err);
      return;
    }else{
      req.flash('success','Foreign training detail updated successfully');
      res.redirect('/foreign_details/show');
    }
  });
});

//Add foreign Submit POST Route
router.post('/add', function(req,res){

  req.checkBody('date', 'Date is required').notEmpty();
  req.checkBody('file_name', 'File name is required').notEmpty();
  req.checkBody('program_name', 'Program name is required').notEmpty();
  req.checkBody('amounts', 'Amount is required').notEmpty();
  req.checkBody('start_date', 'Start date is required').notEmpty();
  req.checkBody('end_date', 'End date is required').notEmpty();
  req.checkBody('funds', ' Type in who funds this').notEmpty();
  req.checkBody('travels', 'travel agent is required').notEmpty();

  req.checkBody('country', 'Country is required').notEmpty();

  //Get errors
  let errors = req.validationErrors();
  if(errors){
    res.render('foreign', {
      title:'Add Foreign',
      errors:errors
    });
  } else {

    let foreign_detail = new Foreign();
    foreign_detail.date = req.body.date;
    foreign_detail.file_name = req.body.file_name;
    foreign_detail.program_name = req.body.program_name;
    foreign_detail.start_date = req.body.start_date;
    foreign_detail.end_date = req.body.end_date;
    foreign_detail.country = req.body.country;
    foreign_detail.funds = req.body.funds;
    foreign_detail.amounts = req.body.amounts;
    foreign_detail.travels = req.body.travels;


    foreign_detail.save(function(err){
      if(err){
        console.log(err);
        return;
      }else{
        req.flash('success','New Foreign training detail added');
        res.redirect('/foreign_details/show');
      }
    });
  }
});

////Get single article foreign Detail
router.get('/:id', function(req, res){
  Foreign.findById(req.params.id, function(err, foreign_detail){
    res.render('foreign_row',{
      foreign_detail:foreign_detail
    });
  });
});

//deleteing foreign detail Route
router.delete('/:id', function(req, res){
  let query = {_id:req.params.id}

  Foreign.remove(query, function(err){
    if(err){
      console.log(err);
    }
    res.send('Success');
  });
});

module.exports = router;
