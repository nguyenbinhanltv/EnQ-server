// Firebase
import * as admin from "firebase-admin";
import * as firebaseHelper from "firebase-functions-helper/dist";

// Jsonwebtoken
import jwt from "jsonwebtoken";

// Model
import { AdminUser } from "../../models/admin.model";

// Handlers
import {
  validateSignUp,
  validateConfirmPassword,
} from "../../utils/handlers/index";
import { hashPassword, validateLogin, isAdminAlreadyExists, comparePassword } from "utils/handlers/admin/admin.handler";

// Ultis
import { clone } from "utils/common";

const db = admin.firestore();
const collectionName = "admin";

// Admin register
export const signUp = async (req, res) => {
  const body = req.body as AdminUser;

  try {
    // Check is already exist
    if (isAdminAlreadyExists(db, collectionName, 'email', body.email) || isAdminAlreadyExists(db, collectionName, 'userName', body.userName)) {
      return res.status(400).send("Email or userName already exists");
    }

    // Check information
    const { value, error } = validateSignUp(body);
    if (error) {
      return res.status(400).send(error);
    }

    // Check password
    if (validateConfirmPassword(body.password, body.confirmPassword) == false) {
      return res.status(400).send("Invalid password");
    }

    // Hash password and add to firestore
    const hashedPassword = await hashPassword(body.password);
    body.password = hashedPassword;
    body.confirmPassword = hashedPassword;

    const result: AdminUser = clone(body);

    return await firebaseHelper.firestore.createDocumentWithID(
      db,
      collectionName,
      result._id,
      result
    )
    .then(doc => res.status(200).send("Register successfully"));
  } catch (error) {
    res.status(400).send(error);
  }
};

export const login = (req, res) => {
  const body: {
    userName: string,
    password: string
  } = req.body;

  try {
    // Check information
    const { value, error } = validateLogin(body);
    if (error) {
      return res.status(400).send(error);
    }

    if (isAdminAlreadyExists(db, collectionName, 'userName', body.userName)) {
      if (comparePassword(body.password, ))
    }


  } catch (error) {
    res.status(400).send(error);
  }
}
