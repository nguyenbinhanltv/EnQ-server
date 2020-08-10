const admin = require('firebase-admin');
const firebaseHelper = require('firebase-functions-helper/dist');

const db = admin.firestore();
const collectionName = 'test-exam-history';

module.exports.getTestExamHistory = (req, res) => {
    const testExamHistoryId = req.params.testExamHistoryId;
    firebaseHelper
    .firestore
    .getDocument(db, collectionName, testExamHistoryId)
    .then(doc => res.status(200).send(doc))
    .catch(err => res.status(400).send(err));
}

module.exports.addTestExamHistory = (req, res) => {
    let data = req.body;
    firebaseHelper
    .firestore
    .createNewDocument(db, collectionName, data)
    .then(doc => {
        data.id = doc.id;
        firebaseHelper
        .firestore
        .updateDocument(db, collectionName, data.id, data)
        .then(doc => res.status(200).send(`Add Test Exam ${data.id} Successfully !`))
        .catch(err => res.status(400).send(err));
    })
    .catch(err => res.status(400).send(err));
}