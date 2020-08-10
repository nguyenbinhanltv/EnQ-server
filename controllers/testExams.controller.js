const admin = require('firebase-admin');
const firebaseHelper = require('firebase-functions-helper/dist');

//Model
const model = require('../models/testExam.model');

const db = admin.firestore();
const collectionName = 'test-exam';

module.exports.getTestExam = (req, res) => {
  const testExamId = req.params.testExamId;
  firebaseHelper
  .firestore
  .getDocument(db, collectionName, testExamId)
  .then(doc => res.status(200).send(doc))
  .catch(err => res.status(400).send(err));
}