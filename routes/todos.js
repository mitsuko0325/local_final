const express = require('express');
const router = express.Router();
var {Todo} = require('../server/models/todo');


router.get('/',(req,res) => {
  Todo.find().sort({_id:-1}).then((todos) => {
    res.render('../views/todos.hbs',{
      todos:todos
    });
  },(err) => {
    res.status(400).send(err);
  })
});

module.exports = router;
