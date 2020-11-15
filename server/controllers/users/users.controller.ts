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
        message: "This user is already exist",
        error: null,
        data: null,
      });
    }

    // Check validate body
    const { value, error } = validateUser(body);
    if (error) {
      return res.status(400).send({
        error: error,
        message: null,
        data: null,
      });
    }

    return firebaseHelper.firestore
      .createDocumentWithID(db, collectionName, body._id, body)
      .then((doc) =>
        res.status(201).send({
          message: "Register successfully",
          error: null,
          data: null,
        })
      )
      .catch((err) =>
        res.status(400).send({
          error: err,
          message: null,
          data: null,
        })
      );
  } catch (error) {
    res.status(400).send({
      error: error + ", Bad error",
      message: null,
      data: null,
    });
  }
};

// Update 1 user in firestore
export const updateUser = async (req, res) => {
  const body: User = req.body;

  try {
    // const { value, error } = validateUser(body);
    // if (error) {
    //   return res.status(400).send({
    //     error: error,
    //     message: null,
    //     data: null,
    //   });
    // }

    if (await isUserAlreadyExists(db, collectionName, body._id)) {
      return firebaseHelper.firestore
        .updateDocument(db, collectionName, body._id, body)
        .then((doc) =>
          res.status(200).send({
            message: `Update user ${body._id}:${body.email} successfully`,
            error: null,
            data: null,
          })
        )
        .catch((err) =>
          res.status(400).send({
            error: err,
            message: null,
            data: null,
          })
        );
    } else {
      res.status(400).send({
        error: "This user doesn't exist",
        message: null,
        data: null,
      });
    }
  } catch (error) {
    res.status(400).send({
      error: error + ", Bad Error",
      message: null,
      data: null,
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
        message: null,
        data: null,
      });
    }

    // Check is has user in firestore
    if ((await isUserAlreadyExists(db, collectionName, userId)) == false) {
      return res.status(400).send({
        error: `Doesn't has user ${userId}`,
        message: null,
        data: null,
      });
    }

    return firebaseHelper.firestore
      .deleteDocument(db, collectionName, userId)
      .then((doc) =>
        res.status(200).send({
          message: `Delete user ${userId} successfully`,
          error: null,
          data: null,
        })
      )
      .catch((err) =>
        res.status(400).send({
          error: err,
          message: null,
          data: null,
        })
      );
  } catch (error) {
    res.status(400).send({
      error: error + ", Bad Error",
      message: null,
      data: null,
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
        message: null,
        data: null,
      });
    }

    // Check user is already in firestore
    if ((await isUserAlreadyExists(db, collectionName, userId)) == false) {
      return res.status(400).send({
        error: `Doesn't has user ${userId}`,
        message: null,
        data: null,
      });
    }

    return firebaseHelper.firestore
      .getDocument(db, collectionName, userId)
      .then((doc) =>
        res.status(200).send({
          message: "Success",
          data: doc,
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
  } catch (error) {
    res.status(400).send({
      error: error + ", Bad Error",
      message: null,
      data: null,
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
          message: "Success",
          data: users,
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
  } catch (error) {
    res.status(400).send({
      error: error + ", Bad Error",
      message: null,
      data: null,
    });
  }
};
