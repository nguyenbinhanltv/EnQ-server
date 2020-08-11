const admin = require('firebase-admin');
const firebaseHelper = require('firebase-functions-helper/dist');

//Model
const TestExam = require('../models/testExam.model').TestExam;

const db = admin.firestore();
const collectionName = 'test-exam';

//Get 1 test-exam
module.exports.getTestExam = (req, res) => {
  const testExamId = req.params.testExamId;
  firebaseHelper
  .firestore
  .getDocument(db, collectionName, testExamId)
  .then(doc => res.status(200).send(doc))
  .catch(err => res.status(400).send(err));
}

//Add 1 TestExam
module.exports.addTestExam = (req, res) => {
  let data = new TestExam(req.body);
  firebaseHelper
  .firestore
  .createNewDocument(db, collectionName, data)
  .then(doc => {
    data.id = doc.id;
    firebaseHelper
    .firestore
    .updateDocument(db, collectionName, data.id, data)
    .then(doc => res.status(200).send(`Add test exam ${data.id} successfully !!!`))
    .catch(err => res.status(400).send(err));
  })
  .catch(err => res.status(400).send(err));
}

//Update 1 TestExam
module.exports.updateTestExam = (req, res) => {
  const testExamId = req.params.testExamId;
  const data = new TestExam(req.body);
  firebaseHelper
  .firestore
  .updateDocument(db, collectionName, testExamId, data)
  .then(doc => res.status(200).send(`Update test exam ${testExamId} successfully !!!`))
  .catch(err => res.status(400).send(err));
}

//Delete 1 TestExam
module.exports.deleteTestExam = (req, res) => {
  const testExamId = req.params.testExamId;
  firebaseHelper
  .firestore
  .deleteDocument(db, collectionName, testExamId)
  .then(doc => res.status(200).send(`Delete test exam ${testExamId} successfully !!!`))
  .catch(err => res.status(400).send(err));
}
