import * as Joi from "joi";

// Model
import { User } from '../../../models/user.model';

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

export const validateUser = (body: User) => {
  const schema = Joi.object().keys({
    _id: Joi.string(),
    displayName: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(8).max(11).required(),
    point: Joi.number().integer().min(0).max(Number.MAX_SAFE_INTEGER),
    rank: Joi.number().integer().min(0).max(Number.MAX_SAFE_INTEGER),
    testExamHistory: Joi.array().min(0).max(5)
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
}