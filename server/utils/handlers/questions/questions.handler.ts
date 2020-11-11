import * as admin from "firebase-admin";
import * as Joi from "joi";
import { resQuestion } from "../../../models/question.model";
import { pick, inRange } from "../../common";

export const validateQuestion = (body) => {
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    type: Joi.number().required(),
    rank: Joi.number().required(),
    answer: Joi.object().required(),
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

export const isAlreadyQuestion = (body) => {};

export const getAllQuestionsByRank = async (db, collectionName, rank) => {
  const questionsRef = db.collection(collectionName);
  const snapshot: Array<resQuestion> = await questionsRef
    .where("rank", "==", rank)
    .get()
    .then((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      return data;
    })
    .then((querySnapshot) => querySnapshot)
    .catch((err) => err);
  return snapshot;
};

export const getAllQuestionsByType = async (db, collectionName, type) => {
  const questionsRef = db.collection(collectionName);
  const snapshot: Array<resQuestion> = await questionsRef
    .where("type", "==", type)
    .get()
    .then((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      return data;
    })
    .then((querySnapshot) => querySnapshot)
    .catch((err) => err);
  return snapshot;
};

export const getAllQuestionsByTypeAndRank = async (db, collectionName, type, rank) => {
  const questionsRef = db.collection(collectionName);
  let snapshot = questionsRef.where("type", "==", type);
  snapshot = snapshot.where("rank", "==", rank);

  snapshot = snapshot
    .get()
    .then((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      return data;
    })
    .then((querySnapshot) => querySnapshot)
    .catch((err) => err);
  return snapshot;
};

export const getRandomQuestions = (questions: Array<resQuestion>) => {
  let data: Array<resQuestion> = [];
  if (questions.length >= 10) {
    for (let i = 0; i < 10; i++) {
      data.push(questions[Math.floor(Math.random() * questions.length)]);
    }
  }

  return data;
};
