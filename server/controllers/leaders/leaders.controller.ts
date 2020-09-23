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
} from "../../utils/handlers/index";

const db = admin.firestore();
const collectionName = "leaders";

// Get leaders in this time (Day)
export const getLeadersDay = async (req, res) => {
  const leadersDay = await queryLeadersByDay(db, "users");

  try {
    if (typeof leadersDay == "string") {
      return res.status(400).send({
        error: "Invalid leaders",
      });
    }

    // Create id with this day
    const leadersId = generateLeadersDayId();

    firebaseHelper.firestore
      .checkDocumentExists(db, collectionName, leadersId)
      .then((result) => {
        if (result.exists) {
          return res.status(400).send({
            massage: "Leaders today already exist",
            data: result.data,
          });
        }

        // Date leaders
        const data: Leaders = {
          _id: leadersId,
          startAt: Date.now(),
          endAt: Date.now() + 86400,
          type: 0,
          users: leadersDay,
        };

        return firebaseHelper.firestore
          .createDocumentWithID(db, collectionName, data._id, data)
          .then((doc) =>
            res.status(200).send({
              message: "Success",
              data: data,
            })
          )
          .catch((err) =>
            res.status(400).send({
              error: err,
            })
          );
      });
  } catch (error) {
    res.status(400).send({
      error: error + ", Bad Error",
    });
  }
};

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
                massage: "Update leaders day success",
              })
            )
            .catch((err) =>
              res.status(400).send({
                error: err,
              })
            );
        }

        return res.status(400).send({
          massage: "Leaders day isn't exist",
        });
      })
      .catch((err) =>
        res.status({
          error: err,
        })
      );
  } catch (error) {
    res.status(400).send({
      error: error + ", Bad Error",
    });
  }
};

// Get leaders for week (Week)
export const getLeadersWeek = (req, res) => {};
