import * as admin from "firebase-admin";
import { pick } from "../../common";

const db = admin.firestore();

export const queryLeadersByDay = async (db, collectionName) => {
  const leadersRef = db.collection(collectionName);

  return await leadersRef
    .orderBy("point", "desc")
    .limit(10)
    .get()
    .then((querySnapshot) => {
      let queryData = [];
      let options = [
        "_id",
        "displayName",
        "photoURL",
        "rank",
        "email",
        "point",
      ];
      querySnapshot.docs.forEach((doc) =>
        queryData.push(pick(doc.data(), options))
      );
      return queryData;
    })
    .then((querySnapshot) => querySnapshot)
    .catch((err) => "Fail to get leaders of day");
};

export const generateLeadersId = () => {
    const key = new Date();
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };

    const leadersId = key.toLocaleDateString("en-US",options).split("/");
    return `${leadersId[0]}${leadersId[1]}${leadersId[2]}`;
}
