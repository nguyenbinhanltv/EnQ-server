const admin = require('firebase-admin');
const firebaseHelper = require('firebase-functions-helper/dist');

const db = admin.firestore();
const collectionName = 'users';

module.exports.CheckAlreadyExist = async (email) => {
  const userRef = db.collection(collectionName);
  const snapshot = await userRef.where('email', '==', email).get();
  if(snapshot.empty) {
    return false;
  }

  return true;
}