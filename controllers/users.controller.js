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
module.exports.getUsers = (req, res) => {
  
}

//Post 1 user
module.exports.updateUser = (req, res) => {
  const data = new User(req.body);
  firebaseHelper
  .firestore
  .updateDocument(db, collectionName, data.id, data)
  .then(doc => res.status(200).send(`Update user data ${data.id} sucessfully !!!`))
  .catch(err => res.status(400).send(err));
}