const {MongoClient,ObjectID} = require('mongodb');

var url = 'mongodb://localhost:27017/TodoApp'

MongoClient.connect(url,(err,client) => {
  if (err) {
    console.log('Unable to connect to mongodb server');
  }
  console.log('Connected to mongodb server');

  const db = client.db('TodoApp')

  // // deleteMany
  // db.collection('Todos').deleteMany({
  //   text:"Eat lunch"
  // }).then((result) => {
  //   console.log(result);
  // });

  // deleteOne
  // db.collection('Todos').deleteOne({
  //   text:'Eat lunch'
  // }).then((result) => {
  //   console.log(result);
  // })
  // findOneAndDelete

  // db.collection('Todos').findOneAndDelete({
  //   completed:false
  // }).then((result) => {
  //   console.log(result);
  // })

  // db.collection('Users').deleteMany({
  //   name: 'Shotaro'
  // }).then((result) => {
  //   console.log(result);
  // })

  // db.collection('Users').deleteOne({
  //   name:'Tomoka'
  // }).then((result) => {
  //   console.log(result);
  // })

  db.collection('Users').findOneAndDelete({
    _id: new ObjectID("5b4c71d6666112443e989b64")
  }).then((result) => {
    console.log(JSON.stringify(result,undefined,2));
  })


  // client.close();
});
