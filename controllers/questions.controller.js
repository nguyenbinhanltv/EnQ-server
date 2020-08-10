const admin = require('firebase-admin');
const firebaseHelper = require('firebase-functions-helper/dist');

//Model
const model = require('../models/question.model');

const db = admin.firestore();
const collectionName = 'questions';

module.exports.getQuestion = (req, res) => {
  const questionId = req.params.questionId;
  firebaseHelper
  .firestore
  .getDocument(db, collectionName, questionId)
  .then(doc => res.status(200).send(doc))
  .catch(err => res.status(400).send(err));
}

module.exports.getQuestions = (req, res) => {
  
}

module.exports.addQuestion = (req, res) => {
  let data = new model.Question(req.body);
  firebaseHelper
  .firestore
  .createNewDocument(db, collectionName, data)
  .then(doc => {
    data.id = doc.id;
    firebaseHelper
    .firestore
    .updateDocument(db, collectionName, data.id, data)
    .then(doc => res.status(200).send(`Add Question ${data.id} Successfully !`))
    .catch(err => res.status(400).send(err));
  })
  .catch(err => res.status(400).send(err));
}