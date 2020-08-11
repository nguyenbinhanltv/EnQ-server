const admin = require('firebase-admin');
const firebaseHelper = require('firebase-functions-helper/dist');

//Model
const Answer = require('../models/answer.model').Answer;

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

//Update 1 answer
module.exports.updateAnswer = (req, res) => {
  const answerId = req.params.answerId;
  const data = new Answer(req.body);
  firebaseHelper
  .firestore
  .updateDocument(db, collectionName, answerId, data)
  .then(doc => res.status(200).send(`Update answer ${answerId} successfully !!!`))
  .catch(err => res.status(400).send(err));
}

//Post 1 answer
module.exports.addAnswer = (req, res) => {
  let data = new Answer(req.body);
  firebaseHelper
  .firestore
  .createNewDocument(db, collectionName, data)
  .then(doc => {
    data.id = doc.id;
    firebaseHelper
    .firestore
    .updateDocument(db, collectionName, data.id, data)
    .then(doc => res.status(200).send(`Add answer ${data.id} successfully !!!`))
    .catch(err => res.status(400).send(err));
  })
  .catch(err => res.status(400).send(err));
}

//Delete 1 answer
module.exports.deleteAnswer = (req, res) => {
  const answerId = req.params.answerId;
  firebaseHelper
  .firestore
  .deleteDocument(db, collectionName, answerId)
  .then(doc => res.status(200).send(`Delete answer ${answerId} successfully !!!`))
  .catch(err => res.status(400).send(err));
}