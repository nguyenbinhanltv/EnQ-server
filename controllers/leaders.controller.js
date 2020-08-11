const admin = require('firebase-admin');
const firebaseHelper = require('firebase-functions-helper/dist');

//Model
const Leaders = require('../models/leaders.model').Leaders;

const db = admin.firestore();
const collectionName = 'leaders';

//Get leaders board
module.exports.getLeaders = (req, res) => {
  const leadersId = req.params.leadersId;
  firebaseHelper
  .firestore
  .getDocument(db, collectionName, leadersId)
  .then(doc => res.status(200).send(doc))
  .catch(err => res.status(400).send(err));
}

//Post leaders board
module.exports.addLeaders = (req, res) => {
  let data = new Leaders(req.body);
  firebaseHelper
  .firestore
  .createNewDocument(db, collectionName, data)
  .then(doc => {
    data.id = doc.id;
    firebaseHelper
    .firestore
    .updateDocument(db, collectionName, data.id, data)
    .then(doc => res.status(200).send(`Add Leaders board ${data.id} Successfully !`))
    .catch(err => res.status(400).send(err));
  })
  .catch(err => res.status(400).send(err));
}
