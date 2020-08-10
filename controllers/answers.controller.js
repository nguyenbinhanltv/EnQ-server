const admin = require('firebase-admin');
const firebaseHelper = require('firebase-functions-helper/dist');

//Model
const model = require('../models/answer.model');

const db = admin.firestore();
const collectionName = 'answer';