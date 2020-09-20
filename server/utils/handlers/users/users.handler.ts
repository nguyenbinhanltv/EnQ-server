export const isEmailAlreadyExists = async (db, collectionName, email) => {
  const userRef = db.collection(collectionName);
  const snapshot = await userRef.where("email", "==", email).get();
  if (snapshot.empty) {
    return false;
  }

  return true;
};

export const isUserAlreadyExists = async (db, collectionName, docId) => {
  const userRef = db.collection(collectionName);
  const snapshot = await userRef.doc(docId).get();
  if (snapshot.exists) {
    return true;
  }

  return false;
};
