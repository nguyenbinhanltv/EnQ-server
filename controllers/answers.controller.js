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
    .checkDocumentExists(db, collectionName, answerId)
    .then(result => {
      if (result.exists) {
        firebaseHelper
          .firestore
          .getDocument(db, collectionName, answerId)
          .then(doc => res.status(200).send(doc))
          .catch(err => res.status(400).send(err));
      }
    })
    .catch(err => res.status(400).send(`Do not have answer ${answerId}`))
}

//Get answers
module.exports.getAnswers = async (req, res) => {
  let data = [];
  const answersRef = db.collection('answers');
  await answersRef.get()
    .then(snapshot => snapshot.forEach(doc => {
      data.push(doc.data());
    }))
    .then(doc => res.status(200).send(data))
    .catch(err => res.status(400).send(err));
}

//Update 1 answer
module.exports.updateAnswer = (req, res) => {
  const answerId = req.params.answerId;
  const data = {
    ...new Answer(req.body)
  };

  firebaseHelper
    .firestore
    .checkDocumentExists(db, collectionName, answerId)
    .then(result => {
      if (result.exists && data) {
        firebaseHelper
          .firestore
          .updateDocument(db, collectionName, answerId, data)
          .then(doc => res.status(200).send(`Update answer ${answerId} successfully !!!`))
          .catch(err => res.status(400).send(err));
      }
    })
    .catch(err => res.status(400).send(`Do not have answer ${answerId}`));
}

//Post 1 answer
module.exports.addAnswer = (req, res) => {
  let data = {
    ...new Answer(req.body)
  };

  if (data) {
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
}

//Delete 1 answer
module.exports.deleteAnswer = (req, res) => {
  const answerId = req.params.answerId;

  firebaseHelper
    .firestore
    .checkDocumentExists(db, collectionName, answerId)
    .then(result => {
      if (result.exists) {
        firebaseHelper
          .firestore
          .deleteDocument(db, collectionName, answerId)
          .then(doc => res.status(200).send(`Delete answer ${answerId} successfully !!!`))
          .catch(err => res.status(400).send(err));
      }
    })
    .catch(err => res.status(400).send(`Do not have answer ${answerId}`));
}