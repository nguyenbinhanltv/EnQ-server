// Firebase
import * as admin from "firebase-admin";
import * as firebaseHelper from "firebase-functions-helper/dist";

// Model
import { Leaders } from "../../models/leaders.model";

// Handler
import {
  queryLeadersByDay,
  generateLeadersId,
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
    const leadersId = generateLeadersId();

    // Date leaders
    const data: Leaders = {
      _id: leadersId,
      startAt: Date.now(),
      endAt: Date.now() + 86400,
      type: 0,
      users: leadersDay,
    };

    return await firebaseHelper.firestore
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
  } catch (error) {
    res.status(400).send({
      error: error + ", Bad Error",
    });
  }
};

// Get leaders for week (Week)
export const getLeadersWeek = (req, res) => {
  
};
