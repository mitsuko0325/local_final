const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = '6b4d72ada01de40786a6a3b5';

// if (!ObjectID.isValid(id)) {
//   console.log('ID is not valid');
// }

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos',todos);
// });

// Todo.findOne({
//   _id:id
// }).then((todo) => {
//   console.log('Todo',todo);
// })
//
// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('Id not found');;
//   }
//   console.log('todo by id',todo);
// }).catch((err) => {
//   console.log(err);
// })

var userID = "5b4d5b12b84cc9051a4ad9f0"


User.findById(userID).then((user) => {
  if (!user) {
    return console.log('No user');
  }
  console.log('User by ID',user);
}).catch((err) => {
  console.log(err);
})
