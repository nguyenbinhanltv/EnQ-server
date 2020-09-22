// Firebase
import * as admin from "firebase-admin";
import * as firebaseHelper from "firebase-functions-helper/dist";

// Model
import { User } from "../../models/user.model";

// Handlers
import {
  isEmailAlreadyExists,
  isUserAlreadyExists,
  validateUser,
} from "../../utils/handlers/index";

const db = admin.firestore();
const collectionName = "users";

// Create 1 user in firestore
export const createUser = async (req, res) => {
  const body: User = req.body;

  try {
    // Check user with email
    if (await isEmailAlreadyExists(db, collectionName, body.email)) {
      return res.status(400).send({
        massage: "This user is already exist",
      });
    }

    // Check validate body
    const { value, error } = validateUser(body);
    if (error) {
      return res.status(400).send(error);
    }

    return firebaseHelper.firestore
      .createNewDocument(db, collectionName, body)
      .then((doc) => {
        body._id = doc.id;

        firebaseHelper.firestore
          .updateDocument(db, collectionName, body._id, body)
          .then((doc) =>
            res.status(201).send({
              massage: "Register successfully",
            })
          )
          .catch((err) =>
            res.status(400).send({
              error: err,
            })
          );
      })
      .catch((err) =>
        res.status(400).send({
          error: err,
        })
      );
  } catch (error) {
    res.status(400).send({
      error: error + ", Bad error",
    });
  }
};

// Update 1 user in firestore
export const updateUser = async (req, res) => {
  const body: User = req.body;

  try {
    const { value, error } = validateUser(body);
    if (error) {
      return res.status(400).send(error);
    }

    if (await isUserAlreadyExists(db, collectionName, body._id)) {
      return firebaseHelper.firestore
        .updateDocument(db, collectionName, body._id, body)
        .then((doc) =>
          res.status(200).send({
            massage: `Update user ${body._id}:${body.email} successfully`,
          })
        )
        .catch((err) =>
          res.status(400).send({
            error: err,
          })
        );
    } else {
      res.status(400).send({
        error: "This user doesn't exist",
      });
    }
  } catch (error) {
    res.status(400).send({
      error: error + ", Bad Error",
    });
  }
};

// Delete 1 user in firestore
export const deleteUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    // Body doesn't has userId
    if (userId == undefined) {
      return res.status(400).send({
        error: "Must has userId in body",
      });
    }

    // Check is has user in firestore
    if ((await isUserAlreadyExists(db, collectionName, userId)) == false) {
      return res.status(400).send({
        error: `Doesn't has user ${userId}`,
      });
    }

    return firebaseHelper.firestore
      .deleteDocument(db, collectionName, userId)
      .then((doc) =>
        res.status(200).send({
          massage: `Delete user ${userId} successfully`,
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

// Get 1 user in firestore
export const getUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    // Body doesn't has userId
    if (userId == undefined) {
      return res.status(400).send({
        error: "Must has userId in body",
      });
    }

    // Check user is already in firestore
    if ((await isUserAlreadyExists(db, collectionName, userId)) == false) {
      return res.status(400).send({
        error: `Doesn't has user ${userId}`,
      });
    }

    return firebaseHelper.firestore
      .getDocument(db, collectionName, userId)
      .then((doc) =>
        res.status(200).send({
          massage: "Success",
          data: doc,
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

// Get all users
export const getAllUsers = async (req, res) => {
  let users = [];
  try {
    const usersRef = db.collection(collectionName);
    return await usersRef
      .get()
      .then((snapshot) =>
        snapshot.forEach((doc) => {
          users.push(doc.data());
        })
      )
      .then((doc) =>
        res.status(200).send({
          massage: "Success",
          data: doc,
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
