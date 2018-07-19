const express = require('express');
const router = express.Router();

router.get('/list',(req,res) => {
  Todo.find().then((todos) => {
    // todosをオブジェクトで使う
    res.render('../views/list.hbs',todos)
    console.log('/list');
    console.log('Success to find');
    console.log(todos);
  },(err) => {
    res.status(400).send(err);
    console.log('Unable to find todo');
  })
});

module.exports = router;
