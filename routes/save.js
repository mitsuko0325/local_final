const express = require('express');
const router = express.Router();
var {Todo} = require('../server/models/todo');

router.post('/',(req,res) => {
  res.setHeader('Content-Type', 'text/plain');
  var todo = new Todo({
    text:req.body.text
  });
  todo.save().then((doc) => {
    res.redirect('/');
  },(err) => {
    res.status(400).send(err)
  });
});

module.exports = router;
