const admin = require('firebase-admin');
const firebaseHelper = require('firebase-functions-helper/dist');

//Model
const TestExamHistory = require('../models/testExamHistory.model').TestExamHistory;

const db = admin.firestore();
const collectionName = 'test-exam-history';

//Get 1 test-exam history
module.exports.getTestExamHistory = (req, res) => {
    const testExamHistoryId = req.params.testExamHistoryId;
    console.log(testExamHistoryId);
    firebaseHelper
    .firestore
    .getDocument(db, collectionName, testExamHistoryId)
    .then(doc => res.status(200).send(doc))
    .catch(err => res.status(400).send(err));
}

//Get test-exams history
module.exports.getTestExamHistorys = async (req, res) => {
    let data = [];
    const testExamHistorysRef = db.collection('test-exam-history');
    await testExamHistorysRef.get()
    .then(snapshot => snapshot.forEach(doc => {
      data.push(doc.data());
    }))
    .then(doc => res.status(200).send(data))
    .catch(err => res.status(400).send(err));
}

//Post 1 test-exam history
module.exports.addTestExamHistory = (req, res) => {
    let data = {...new TestExamHistory(req.body)};
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

//Update 1 test-exam history
module.exports.updateTestExamHistory = (req, res) => {
    const testExamHistoryId = req.params.testExamHistoryId;
    const data = {...new TestExamHistory(req.body)};
    firebaseHelper
    .firestore
    .updateDocument(db, collectionName, testExamHistoryId, data)
    .then(doc => res.status(200).send(`Update test-exam-history ${testExamHistoryId} successfully !!!`))
    .catch(err => res.status(400).send(err));
}

//Delete 1 test-exam history
module.exports.deleteTestExamHistory = (req, res) => {
    const testExamHistoryId = req.params.testExamHistoryId;
    firebaseHelper
    .firestore
    .deleteDocument(db, collectionName, testExamHistoryId)
    .then(doc => res.status(200).send(`Delete test-exam-history ${testExamHistoryId} successfully !!!`))
    .catch(err => req.status(400).send(err));
}