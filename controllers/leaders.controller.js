const admin = require('firebase-admin');
const firebaseHelper = require('firebase-functions-helper/dist');

//Model
const model = require('../models/leaders.model');

const db = admin.firestore();
const collectionName = 'leaders';

module.exports.getLeaders = (req, res) => {
  const leadersId = req.params.leadersId;
  firebaseHelper
  .firestore
  .getDocument(db, collectionName, leadersId)
  .then(doc => res.status(200).send(doc))
  .catch(err => res.status(400).send(err));
}
