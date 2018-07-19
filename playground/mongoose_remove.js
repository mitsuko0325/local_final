const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

//  Todo.remove()
// 引数渡さないと全部消す

// Todo.remove({}).then((result) => {
//   console.log(result);
// });

// Todo.findOneAndRemove
// マッチした最初のやつ消す
// Todo.findByIdAndRemove

Todo.findByIdAndRemove('5b4da8a5678b1cc47c5ac2b7').then((todo) => {
  console.log(todo + ' was removed');
})
