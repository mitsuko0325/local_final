// 使う環境（development,test,heroku）によって使うデータベースを変えるコード
// require('./config/config.js')

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const _ = require('lodash');
const hbs = require('hbs');
const fs = require('fs')
// Heroku用の設定
const port = process.env.PORT || 3000


// var {mongoose} = require('./db/mongoose.js');
// var {Todo} = require('./models/todo');
// var {User} = require('./models/user');
// var {ObjectID} = require('mongodb');

var {mongoose} = require('./server/db/mongoose.js');
var {Todo} = require('./server/models/todo');
var {User} = require('./server/models/user');
var {ObjectID} = require('mongodb');


// POSTをJSONで受け取る
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 静的ファイルの登録
app.use('/public',express.static(__dirname + '/public'));
// partialを登録
hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine','hbs')

// logとるやつ
app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log',log+'\n',(err) => {
    if (err) {
      console.log('error in log');
    }
  });
  console.log(`${now}: ${req.method} ${req.url}`);
  next();
})

// app.use('/',home);
// app.use('/todos',list);
// app.use('todos/create',create);

// app.get('/',(req,res) => {
//   res.render('../views/home.hbs');
// })

// todoを全部取得
app.get('/',(req,res) => {
  Todo.find().then((todos) => {
    // todosをオブジェクトで使う
    res.render('../views/todos.hbs',{
      todos:todos
    });
    // console.log('Success to find');
  },(err) => {
    res.status(400).send(err);
    console.log('Unable to find todo');
  })
});

// todoを作成する
app.get('/todos/create',(req,res) => {
  res.render('../views/create.hbs');
})

// todoを保存する
app.post('/todos/save',(req,res) => {
  res.setHeader('Content-Type', 'text/plain');
  var todo = new Todo({
    text:req.body.text
  });
  todo.save().then((doc) => {
    console.log('Save todo');
    res.redirect('/');
  },(err) => {
    res.status(400).send(err)
    console.log('Unable to save todo');
  });
});



// todoをidで検索し取得
app.get('/todos/:id',(req,res) => {

  //valid id useing isValid
    //404 -send back empty send

  //findById
    //success
     //if todo -send it back
     //if no todo --send back 404 with empty body
    //error
     //400 -

  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    console.log('id is not valid');
    return res.status(404).send('');
  }

  Todo.findById(id).then((todo) => {
    if (!todo) {
      console.log('Todo not found');
      res.status(404).send();
    }
    console.log('Todo by id',todo);
    res.render('../views/todo_detail.hbs',todo);
  }).catch((err) => {
    console.log(err);
    res.status(400).send();
  });
});

// todoを消す
app.get('/todos/:id/delete',(req,res) => {

  // get the id
  // validate id -> if not return 404
  // remove todo by id
    //success
      // if no doc -> send 400
      // if doc, send doc back with 200
    //error -> 400 with empty body

  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    console.log('id is not valid');
    return res.status(404).send()
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      console.log('Todo not found');
      res.status(404).send()
    }
    // console.log('Todo was removed',todo);
    console.log('Delete todo');
    res.redirect('/');
  }).catch((err) => {
    console.log(err);
    res.status(400).send();
  });
});

// todoをアップデート
app.post('/todos/:id/update',(req,res) => {
  res.setHeader('Content-Type', 'text/plain');

  var id = req.params.id
  var body = _.pick(req.body,['text','completed']);

  if (!ObjectID.isValid(id)) {
    console.log('id is not valid');
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
    console.log('Update todo');
    // console.log(req.body.state);
    res.redirect('/');


  }).catch((e) => {
    res.status(400).send();
  })

})

app.listen(port,() => {
  console.log(`Started on port ${port}`);
});

module.exports = {
  app
};
