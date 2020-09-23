import * as admin from "firebase-admin";
import * as Joi from "joi";
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

// Check today in range leaders week
export const isAlreadyLeadersWeek = async (db, collectionName) => {
  const leadersRef = db.collection(collectionName);
  const today = Date.now();

  return await leadersRef
    .where("startAt", "<=", today)
    .where("endAt", ">=", today)
    .get()
    .then((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      return data;
    })
    .then((querySnapshot) => querySnapshot)
    .catch((err) => "Fail to check leaders week");
};

// Generate leaders day key
export const generateLeadersDayId = () => {
  const key = new Date();
  const options = { year: "numeric", month: "numeric", day: "numeric" };

  const leadersId = key.toLocaleDateString("en-US", options).split("/");
  return `${leadersId[0]}${leadersId[1]}${leadersId[2]}leadersDay`;
};

// Generate leaders week key
export const generateLeadersWeekId = () => {
  const key = new Date();
  const options = { year: "numeric", month: "numeric", day: "numeric" };

  const leadersId = key.toLocaleDateString("en-US", options).split("/");
  return `${leadersId[0]}${leadersId[1]}${leadersId[2]}${leadersId[0]}${
    leadersId[1] + 7
  }${leadersId[2]}leadersWeek`;
};

// Validate leaders
export const validateLeaders = (body) => {
  const schema = Joi.object().keys({
    _id: Joi.string().required(),
    startAt: Joi.number().required(),
    endAt: Joi.number().required(),
    type: Joi.number().required(),
    users: Joi.array().min(0).max(10).required(),
  });
  const { error, value } = schema.validate(body);
  if (error && error.details) {
    return {
      error,
    };
  }
  return {
    value,
  };
};
