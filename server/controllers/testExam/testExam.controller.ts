// import {TestExam} from '../../models/test-exam.model'
import * as jwt from "jsonwebtoken";
import { resQuestion, reqQuestion } from "../../models/question.model";
import * as admin from "firebase-admin";
import * as firebaseHelper from "firebase-functions-helper/dist";
import { QuestionType } from "./../../utils/enum";
import {
  validateQuestion,
  isAlreadyQuestion,
  getAllQuestionsByRank,
  getAllQuestionsByType,
  getRandomQuestions,
} from "../../utils/handlers/index";

const collectionName = "questions";
const db = admin.firestore();

export const addQuestion = async (req, res) => {
  const token = req.headers["token"];
  let body: resQuestion = req.body;

  try {
    if (token != undefined) {
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, adminData) => {
        if (error) {
          return res.status(400).send({
            error: "Invalid token",
          });
        }

        if (adminData) {
          const { value, error } = validateQuestion(body);
          if (error) {
            return res.status(400).send(error);
          }
          if (value) {
            return firebaseHelper.firestore
              .createNewDocument(db, collectionName, body)
              .then((doc) => {
                body._id = doc.id;

                firebaseHelper.firestore
                  .updateDocument(db, collectionName, body._id, body)
                  .then(() => {
                    res.status(200).send({
                      message: "Add question successfully",
                      error: null,
                    });
                  })
                  .catch((error) =>
                    res.status(400).send({
                      error: error,
                    })
                  );
              })
              .catch((error) => {
                return res.status(400).send({
                  error: "Add question error" + error,
                });
              });
          }
        }
      });
    }
  } catch (error) {
    return res.status(400).send({
      error: error + " ,Bad Error",
    });
  }
};

export const getQuestionByID = async (req, res) => {
  const _id: string = req.params.questionId;

  try {
    if (_id != undefined) {
      return await firebaseHelper.firestore
        .getDocument(db, collectionName, _id)
        .then((doc) =>
          res.status(200).send({
            message: "OK",
            data: doc,
          })
        )
        .catch((error) =>
          res.status(400).send({
            error: "Invalid question",
          })
        );
    }
  } catch (error) {
    return res.status(400).send({
      error: "Id not valid",
    });
  }
};

export const getAllquestion = async (req, res) => {
  let data = [];
  const questionsRef = db.collection(collectionName);
  try {
    await questionsRef.get()
          .then(snapshot => {
            if (snapshot.empty) {
              res.status(400).send({
                error: "No question for you"
              })
            } else {
              snapshot.forEach(doc => data.push(doc.data()));
            }
          })
          .then(() => {
            res.status(200).send({
              message: "OK",
              data: data
            })
          })
          .catch(err => {
            res.status(400).send({
              error: "Error form snapshot"
            })
          })
  } catch (err) {
    res.status(400).send({
      error: err + " , Bad Error"
    });
  }
}

export const editQuestionById = async (req, res) => {
  const body: reqQuestion = req.body;
  const _id = req.params.questionId;

  try {
    const { value, error } = validateQuestion(body);
    if (error) {
      return res.status(400).send({
        error: "Invalid question",
      });
    }
    if (value) {
      return firebaseHelper
            .firestore
            .checkDocumentExists(db, collectionName, _id)
            .then(result => {
              if (result.exists) {
                return firebaseHelper.firestore
                .updateDocument(db, collectionName, _id, body)
                .then((doc) =>
                  res.status(200).send({
                    message: "Update successfully",
                  })
                )
                .catch((err) =>
                  res.status(400).send({
                    error: "Invalid question",
                  })
                );
              }

              return res.status(400).send({
                error: "Invalid question",
              });
            });
    }
  } catch (error) {
    return res.status(400).send({
      error: error + " Bad Error",
    });
  }
};

export const deleteQuestionById = async (req, res) => {
  const _id = req.params.questionId;
  try {
    if (_id) {
      return firebaseHelper.firestore
        .checkDocumentExists(db, collectionName, _id)
        .then((result) => {
          if (result.exists) {
            return firebaseHelper.firestore
              .deleteDocument(db, collectionName, _id)
              .then(() =>
                res.status(200).send({
                  message: "Delete question successfully",
                })
              )
              .catch((err) =>
                res.status(400).send({
                  error: err,
                })
              );
          }

          return res.status(400).send({
            error: "Doesn't have question",
          });
        })
        .catch((err) =>
          res.status(400).send({
            error: err,
          })
        );
    } else {
      return res.status(400).send("Id invalid");
    }
  } catch (error) {
    return res.status(400).send({
      error: error + " ,Bad Error",
    });
  }
};

export const getTestExamByType = async (req, res) => {
  const type: number = req.query.type;
  const questions: Array<resQuestion> = await getAllQuestionsByType(
    db,
    "questions",
    type
  )
    .then((data) => data)
    .catch((err) => null);
  try {
    if (questions) {
      let data = getRandomQuestions(questions);
      return res.status(200).send({
        message: "OK",
        data: data,
      });
    }
    return res.send({
      error: "No test exam for you :D",
    });
  } catch (error) {
    return res.status(400).send({
      error: error + " ,Bad Error",
    });
  }
};

export const getTestExamByRank = async (req, res) => {
  const rank: string = req.query.rank;
  const questions: Array<resQuestion> = await getAllQuestionsByRank(
    db,
    "questions",
    rank
  )
    .then((data) => data)
    .catch((err) => null);
  try {
    if (questions) {
      let data = getRandomQuestions(questions);
      return res.status(200).send({
        message: "OK",
        data: data,
      });
    }
    return res.send({
      error: "No test exam for you :D",
    });
  } catch (error) {
    return res.status(400).send({
      error: error + " ,Bad Error",
    });
  }
};
