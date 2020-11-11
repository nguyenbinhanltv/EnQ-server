// Firebase
import * as admin from "firebase-admin";
import * as firebaseHelper from "firebase-functions-helper/dist";

// Model
import { Leaders } from "../../models/leaders.model";

// Handler
import {
  queryLeadersByDay,
  generateLeadersDayId,
  generateLeadersWeekId,
  validateLeaders,
  isAlreadyLeadersWeek,
} from "../../utils/handlers/index";

const db = admin.firestore();
const collectionName = "leaders";

// Get leaders in this time (Day)
export const getLeadersDay = async (req, res) => {

  try {
    // Create id with this day
    const leadersId = generateLeadersDayId();

    firebaseHelper.firestore
      .checkDocumentExists(db, collectionName, leadersId)
      .then((result) => {
        if (result.exists) {
          return res.status(200).send({
            message: "Leaders today already exist",
            data: result.data,
            error: null
          });
        }

        // Date leaders
        const data: Leaders = {
          _id: leadersId,
          startAt: Math.floor(Date.now() / 1000),
          endAt: Math.floor(Date.now() / 1000) + 86400,
          type: 0,
          users: [],
        };

        return firebaseHelper.firestore
          .createDocumentWithID(db, collectionName, data._id, data)
          .then((doc) =>
            res.status(200).send({
              message: "Success",
              data: data,
              error: null
            })
          )
          .catch((err) =>
            res.status(400).send({
              error: err,
              message: null,
              data: null
            })
          );
      });
  } catch (error) {
    res.status(400).send({
      error: error + ", Bad Error",
      message: null,
      data: null
    });
  }
};

// Update leaders day
export const updateLeadersDay = async (req, res) => {
  const body: Leaders = req.body;

  try {
    // Check information leaders
    const { value, error } = validateLeaders(body);
    if (error) {
      return res.status(400).send(error);
    }

    firebaseHelper.firestore
      .checkDocumentExists(db, collectionName, body._id)
      .then((result) => {
        if (result.exists) {
          return firebaseHelper.firestore
            .updateDocument(db, collectionName, body._id, body)
            .then((doc) =>
              res.status(200).send({
                message: "Update leaders day success",
                data: null,
                error: null,
              })
            )
            .catch((err) =>
              res.status(400).send({
                error: err,
                message: null,
                data: null,
              })
            );
        }

        return res.status(400).send({
          message: "Leaders day isn't exist",
          data: null,
          error: null,
        });
      })
      .catch((err) =>
        res.status({
          error: err,
          data: null,
          message: null
        })
      );
  } catch (error) {
    res.status(400).send({
      error: error + ", Bad Error",
      data: null,
      message: null
    });
  }
};

// Get leaders for week (Week)
export const getLeadersWeek = async (req, res) => {

  try {
    // Flag to check have leaders week in firestore
    const isLeadersWeekAlreadyExist = await isAlreadyLeadersWeek(
      db,
      collectionName
    )
      .then((doc) => doc)
      .catch((err) => null);
    if (isLeadersWeekAlreadyExist) {
      return res.status(200).send({
        message: "Leaders week already exist",
        data: isLeadersWeekAlreadyExist,
        error: null
      });
    }

    // Create id leaders week
    const leadersId = generateLeadersWeekId();

    firebaseHelper.firestore
      .checkDocumentExists(db, collectionName, leadersId)
      .then((result) => {
        if (result.exists) {
          return res.status(400).send({
            message: "Leaders week already exist",
            data: result.data,
            error: null
          });
        }

        // Date leaders
        const data: Leaders = {
          _id: leadersId,
          startAt: Math.floor(Date.now() / 1000),
          endAt: Math.floor(Date.now() / 1000) + 604800,
          type: 1,
          users: [],
        };

        return firebaseHelper.firestore
          .createDocumentWithID(db, collectionName, data._id, data)
          .then((doc) =>
            res.status(200).send({
              message: "Success",
              data: data,
              error: null,
            })
          )
          .catch((err) =>
            res.status(400).send({
              error: err,
              data: null,
              message: null
            })
          );
      });
  } catch (error) {
    res.status(400).send({
      error: error + ", Bad Error",
      data: null,
      message: null
    });
  }
};

// Update leaders week
export const updateLeadersWeek = async (req, res) => {
  const body: Leaders = req.body;

  try {
    // Check information leaders
    const { value, error } = validateLeaders(body);
    if (error) {
      return res.status(400).send({
        error: error,
        message: null,
        data: null,
      });
    }

    firebaseHelper.firestore
      .checkDocumentExists(db, collectionName, body._id)
      .then((result) => {
        if (result.exists) {
          return firebaseHelper.firestore
            .updateDocument(db, collectionName, body._id, body)
            .then((doc) =>
              res.status(200).send({
                message: "Update leaders week success",
                data: null,
                error: null,
              })
            )
            .catch((err) =>
              res.status(400).send({
                error: err,
                message: null,
                data: null,
              })
            );
        }

        return res.status(400).send({
          message: "Leaders week isn't exist",
          data: null,
          error: null,
        });
      })
      .catch((err) =>
        res.status({
          error: err,
          data: null,
          message: null
        })
      );
  } catch (error) {
    res.status(400).send({
      error: error + ", Bad Error",
      message: null,
      data: null
    });
  }
};