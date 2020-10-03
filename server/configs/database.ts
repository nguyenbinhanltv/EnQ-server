import * as admin from "firebase-admin";
import * as serviceAccount from "../serviceAccount.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: "https://enq-mobile.firebaseio.com",
});

export class FireStore {
  constructor() {
    this.__init__();
  }
  db;
  __init__() {
    console.log("init Firestore");
    this.db = admin.firestore();
  }
}

export const db = new FireStore().db;
