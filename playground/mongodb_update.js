const {MongoClient,ObjectID} = require('mongodb')

var url = 'mongodb://localhost:27017/TodoApp'

MongoClient.connect(url, (err,client) => {
  if (err) {
    console.log('Unable to connect to mongodb server');
  }

  const db = client.db('TodoApp');

  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID("5b4c6ce583886c519ca7de18")
  // },{
  //   // mongodb演算子を使う必要がある。
  //   $set:{
  //     completed:true
  //   }
  // },{
  //   returnOriginal:false
  // }).then((result) => {
  //   console.log(result);
  // })

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID("5b4c855c9c99a7460c7d9ced")
  },{
    $inc:{
      age:3
    },
    $set:{
      name:'Arimitsu'
    }
  },{
    returnOriginal:false
  }).then((result) => {
    console.log(result);
  })








  client.close();
})
