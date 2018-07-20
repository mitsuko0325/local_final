const express = require('express');
const router = express.Router();

const _ = require('lodash');

var {Todo} = require('../server/models/todo');
var {ObjectID} = require('mongodb');

router.get('/:id',(req,res) => {


  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send('');
  }

  Todo.findById(id).then((todo) => {
    if (!todo) {
      res.status(404).send();
    }
    res.render('../views/todo_detail.hbs',todo);
  }).catch((err) => {
    res.status(400).send();
  });
});


router.get('/:id/delete',(req,res) => {

  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send()
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      res.status(404).send()
    }
    res.redirect('/');
  }).catch((err) => {
    res.status(400).send();
  });
});

router.post('/:id/update',(req,res) => {
  res.setHeader('Content-Type', 'text/plain');

  var id = req.params.id
  var body = _.pick(req.body,['text','completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send()
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  }else{
    body.completed = req.body.state;
    body.completedAt = null
  }

  Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo) => {
    if (!todo) {
      return res.status.send()
    }
    res.redirect('/');


  }).catch((e) => {
    res.status(400).send();
  })
})

module.exports = router;
