const admin = require('firebase-admin');
const firebaseHelper = require('firebase-functions-helper/dist');

//Model
const model = require('../models/answer.model');

const db = admin.firestore();
const collectionName = 'answers';

//Get 1 answer
module.exports.getAnswer = (req, res) => {
  const answerId = req.params.answerId;
  firebaseHelper
  .firestore
  .getDocument(db, collectionName, answerId)
  .then(doc => res.status(200).send(doc))
  .catch(err => res.status(400).send(err));
}

//Get answers
module.exports.getAnswers = (req, res) => {
  
}