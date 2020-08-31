const admin = require('firebase-admin');
const firebaseHelper = require('firebase-functions-helper/dist');

//Model
const User = require('../models/user.model').User;

const db = admin.firestore();
const collectionName = 'users';

//Get 1 user
module.exports.getUser = (req, res) => {
  const userId = req.params.userId;
  firebaseHelper
  .firestore
  .getDocument(db, collectionName, userId)
  .then(doc => res.status(200).send(doc))
  .catch(err => res.status(400).send(err));
}

//Get users
module.exports.getUsers = async (req, res) => {
  let data = [];
  const usersRef = db.collection('users');
  await usersRef.get()
  .then(snapshot => snapshot.forEach(doc => {
    data.push(doc.data());
  }))
  .then(doc => res.status(200).send(data))
  .catch(err => res.status(400).send(err));
}

//Post 1 user
module.exports.updateUser = (req, res) => {
  const data = new User(req.body);
  const userId = req.params.userId;
  firebaseHelper
  .firestore
  .updateDocument(db, collectionName, userId, data)
  .then(doc => res.status(200).send(`Update user data ${userId} successfully !!!`))
  .catch(err => res.status(400).send(err));
}

//Create 1 user
module.exports.addUser = (req, res) => {
  let data = new User(req.body);
  firebaseHelper
  .firestore
  .createNewDocument(db, collectionName, data)
  .then(doc => {
    data.id = doc.id;
    firebaseHelper
    .firestore
    .updateDocument(db, collectionName, data.id, data)
    .then(doc => res.status(200).send(`Add user ${data.id} successfully !!!`))
    .catch(err => res.status(400).send(err));
  })
  .catch(err => res.status(400).send(err));
}

//Delete 1 question
module.exports.deleteUser = (req, res) => {
  const userId = req.params.userId;
  firebaseHelper
  .firestore
  .deleteDocument(db, collectionName, userId)
  .then(doc => res.status(200).send(`Delete user ${userId} successfully !!!`))
  .catch(err => res.status(400).send(err));
}