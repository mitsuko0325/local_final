const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const _ = require('lodash');
const hbs = require('hbs');
const fs = require('fs')

const port = process.env.PORT || 3000



var {mongoose} = require('./server/db/mongoose.js');
var {Todo} = require('./server/models/todo');
var {ObjectID} = require('mongodb');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/public',express.static(__dirname + '/public'));

hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine','hbs')

app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log',log+'\n',(err) => {
    if (err) {
    }
  });
  next();
})

const list = require('./routes/todos');
const create = require('./routes/create')
const save = require('./routes/save');
const id = require('./routes/id');

app.use('/',list);
app.use('/create',create);
app.use('/save',save)
app.use('/todo',id)

app.listen(port,() => {
});

module.exports = {
  app
};
