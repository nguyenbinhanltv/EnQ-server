const admin = require('firebase-admin');
const firebaseHelper = require('firebase-functions-helper/dist');

const db = admin.firestore();
const collectionName = 'users';

module.exports.CheckAlreadyExist = async (email) => {
  let user = null;

  const queryArray = [
    ['email', '==', email],
  ];
  const orderBy = ['email'];

  await firebaseHelper
  .firestore
  .queryData(db, collectionName, queryArray, orderBy)
  .then(doc => user = doc)
  .catch(err => err);

  return user;
}