// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,client) => {
  if (err) {
    return console.log('Unable to connect to Mongodb server');
  }
  console.log('Connected to Mongodb server');

  const db = client.db('TodoApp');

  // toArray()はPromiseメソッドを持つ
  // thenの第一引数の関数が実行されないと、第二引数(err)のやつが実行される

  // db.collection('Todos').find({
  //   _id: new ObjectID("5b4af624f96a2e40514242d3")
  // }).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs,undefined,2));
  // },(err) => {
  //   console.log('Unable to fetch todos',err);
  // });

  // 数を数えるコード

  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`Todos count: ${count}`);
  // },(err) => {
  //   console.log('Unable to fetch todos',err);
  // });

  db.collection('Users').find({
    name:'Shotaro'
  }).toArray().then((docs) => {
    console.log('Users');
    console.log(JSON.stringify(docs,undefined,2));
  },(err) => {
    console.log('Unable to find Shotaro');
  })

  db.collection('Users').find({
    name:'Shotaro'
  }).count().then((count) => {
    console.log(`The number of user as Shotaro :${count}`);
  },(err) => {
    console.log('Unable to find Shotaro');
  })

  // client.close();
});
