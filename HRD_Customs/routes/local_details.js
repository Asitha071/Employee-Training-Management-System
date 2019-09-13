const express = require('express');
const router = express.Router();

//Bring in  Local detail Model
let Local = require('../models/local_detail');

//show local detail Route
router.get('/show', function(req, res){
  Local.find({}, function(err, local_details){
    if(err){
      console.log(err);
    } else {
      res.render('localhome', {
        title:'Local',
        local_details: local_details
      });
    }
  });
});



//Add local detail Route
router.get('/add', function(req, res){
  res.render('local',{
    title: 'Add local Detail'
  });
});



//Edit single local Detail
router.get('/edit/:id', function(req, res){
  Local.findById(req.params.id, function(err, local_detail){
    res.render('edit_local',{
      title:'Edit local Detail',
      local_detail:local_detail
    });
  });
});

//update Submit POST Route
router.post('/edit/:id', function(req,res){
  let local_detail = {};
  local_detail.s_no = req.body.s_no;
  local_detail.type = req.body.type;
  local_detail.program_name = req.body.program_name;
  local_detail.file_num = req.body.file_num;
  local_detail.custom_trainees = req.body.custom_trainees;
  local_detail.other_trainees = req.body.other_trainees;
  local_detail.cost = req.body.cost;
  local_detail.benefitted = req.body.benefitted;
  local_detail.voted = req.body.voted;
  local_detail.comment = req.body.comment;

  let query = {_id:req.params.id}

  Local.update(query, local_detail, function(err){
    if(err){
      console.log(err);
      return;
    }else{
      req.flash('success','Local training detail updated successfully');
      res.redirect('/local_details/show');
    }
  });
});

//Add local Submit POST Route
router.post('/add', function(req,res){

  req.checkBody('s_no', 'Serial number is required').notEmpty();
  req.checkBody('type', 'Training type is required').notEmpty();
  req.checkBody('program_name', 'Program name is required').notEmpty();
  req.checkBody('file_num', 'File number  is required').notEmpty();
  req.checkBody('custom_trainees', 'No of custom trainees are required').notEmpty();
  req.checkBody('other_trainees', 'No of other trainees are required').notEmpty();
  req.checkBody('benefitted', ' Type in benefitiories').notEmpty();
  req.checkBody('cost', 'cost is required').notEmpty();
  req.checkBody('voted', 'votes are required').notEmpty();
  req.checkBody('comment', 'Comments are required').notEmpty();

  //Get errors
  let errors = req.validationErrors();
  if(errors){
    res.render('local', {
      title:'Add Local',
      errors:errors
    });
  } else {

    let local_detail = new Local();
    local_detail.s_no = req.body.s_no;
    local_detail.type = req.body.type;
    local_detail.program_name = req.body.program_name;
    local_detail.file_num = req.body.file_num;
    local_detail.custom_trainees = req.body.custom_trainees;
    local_detail.other_trainees = req.body.other_trainees;
    local_detail.cost = req.body.cost;
    local_detail.benefitted = req.body.benefitted;
    local_detail.voted = req.body.voted;
    local_detail.comment = req.body.comment;

    local_detail.save(function(err){
      if(err){
        console.log(err);
        return;
      }else{
        req.flash('success','New Local training detail added');
        res.redirect('/local_details/show');
      }
    });
  }
});

////Get single article local Detail
router.get('/:id', function(req, res){
  Local.findById(req.params.id, function(err, local_detail){
    res.render('local_row',{
      local_detail:local_detail
    });
  });
});

//deleteing local detail Route
router.delete('/:id', function(req, res){
  let query = {_id:req.params.id}

  Local.remove(query, function(err){
    if(err){
      console.log(err);
    }
    res.send('Success');
  });
});

module.exports = router;
