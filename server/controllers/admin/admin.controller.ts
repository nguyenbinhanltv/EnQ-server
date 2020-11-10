// Firebase
import * as admin from "firebase-admin";
import * as firebaseHelper from "firebase-functions-helper/dist";

// Jsonwebtoken
import * as jwt from "jsonwebtoken";

// Model
import { AdminUser } from "../../models/admin.model";

// Handlers
import {
  validateSignUp,
  validateConfirmPassword,
  hashPassword,
  validateLogin,
  isAdminAlreadyExists,
  comparePassword,
  queryAdminData,
  updateRefeshToken,
} from "../../utils/handlers/index";

// Ultis
import { clone } from "../../utils/common";

const db = admin.firestore();
const collectionName = "admin";

// Admin register
export const signUp = async (req, res) => {
  const body = req.body as AdminUser;

  try {
    // Check is already exist
    if (
      (await isAdminAlreadyExists(db, collectionName, "email", body.email)) ||
      (await isAdminAlreadyExists(
        db,
        collectionName,
        "userName",
        body.userName
      ))
    ) {
      return res.status(400).send({
        message: null,
        data: null,
        error: "Email or userName already exists",
      });
    }

    // Check information
    const { value, error } = validateSignUp(body);
    if (error) {
      return res.status(400).send({
        error: error,
        message: null,
        data: null
      });
    }

    // Check password
    if (validateConfirmPassword(body.password, body.confirmPassword) == false) {
      return res.status(400).send({
        error: "Invalid password",
        message: null,
        data: null
      });
    }

    // Hash password and add to firestore
    const hashedPassword = await hashPassword(body.password);
    body.password = hashedPassword;
    body.confirmPassword = hashedPassword;

    const result: AdminUser = clone(body);

    return await firebaseHelper.firestore
      .createNewDocument(db, collectionName, result)
      .then((doc) => {
        result._id = doc.id;
        firebaseHelper.firestore
          .updateDocument(db, collectionName, result._id, result)
          .then((doc) =>
            res.status(200).send({
              message: "Register successfully",
              error: null,
              data: null
            })
          )
          .catch((err) =>
            res.status(400).send({
              error: "Invalid _id",
              message: null,
              data: null
            })
          );
      });
  } catch (error) {
    res.status(400).send({
      error: error,
      data: null,
      message: null
    });
  }
};

export const login = async (req, res) => {
  const body: {
    userName: string;
    password: string;
  } = req.body;

  try {
    // Check information
    const { value, error } = validateLogin(body);
    if (error) {
      return res.status(400).send({
        error: error,
        message: null,
        data: null
      });
    }

    const queryAdminUser: AdminUser = await queryAdminData(
      db,
      collectionName,
      body.userName
    );

    if (queryAdminUser) {
      if (comparePassword(body.password, queryAdminUser.password)) {
        // Create the access token with the shorter lifespan
        const accessToken = jwt.sign(
          {
            exp: Number(
              Math.floor(Date.now() / 1000) + process.env.ACCESS_TOKEN_LIFE
            ),
            _id: queryAdminUser._id,
            displayName: queryAdminUser.displayName,
            userName: queryAdminUser.userName,
            email: queryAdminUser.email,
            phone: queryAdminUser.phone,
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
            algorithm: "HS256",
          }
        );

        // Create the refresh token with the longer lifespan
        const refreshToken = jwt.sign(
          {
            exp: Number(
              Math.floor(Date.now() / 1000) + process.env.REFRESH_TOKEN_LIFE
            ),
            _id: queryAdminUser._id,
            displayName: queryAdminUser.displayName,
            userName: queryAdminUser.userName,
            email: queryAdminUser.email,
            phone: queryAdminUser.phone,
          },
          process.env.REFRESH_TOKEN_SECRET,
          {
            algorithm: "HS256",
          }
        );

        return res.status(200).send({
          data: {
            token: accessToken,
            refeshTokenStatus: await updateRefeshToken(
              db,
              firebaseHelper,
              collectionName,
              queryAdminUser._id,
              refreshToken
            ),
          },
          message: null,
          error: null
        });
      } else {
        res.status(400).send({
          error: "Password is wrong",
          message: null,
          data: null
        });
      }
    } else {
      res.send({
        error: "Account is not exist",
        message: null,
        data: null
      });
    }
  } catch (error) {
    res.status(400).send({
      error: error + ", Bad Error",
      message: null,
      data: null
    });
  }
};

export const logedIn = async (req, res) => {
  jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (error, adminData) => {
    console.log(error);
    if (error) {
      return res.status(400).send({
        error: "Invalid token",
        message: null,
        data: null
      });
    } else {
      return res.status(200).send({
        message: "Workout",
        data: adminData,
        error: null
      });
    }
  });
};

export const verifyToken = async (req, res, next) => {
  const bearerHeader = req.headers["token"];
  if (typeof bearerHeader != "undefined") {
    req.token = bearerHeader;
    next();
  } else {
    res.status(403).send({
      error: "Token invalid",
    });
  }
};
