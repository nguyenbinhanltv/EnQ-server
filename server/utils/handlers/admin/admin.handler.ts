import * as Joi from "joi";
import * as Bcrypt from "bcryptjs";
import { AdminUser } from "../../../models/admin.model";

// Hash the password
export const hashPassword = (password) => {
  const salt = Bcrypt.genSaltSync(10);
  return Bcrypt.hashSync(password, salt);
};

// Compare password and password was hash
export const comparePassword = (password, hashedPassword) => {
  return Bcrypt.compareSync(password, hashedPassword);
};

// Validate when sign up
export const validateSignUp = (body) => {
  const schema = Joi.object().keys({
    _id: Joi.string(),
    displayName: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(8).max(11).required(),
    userName: Joi.string().max(15).required(),
    password: Joi.string()
      .min(6)
      .max(20)
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required(),
    confirmPassword: Joi.string()
      .min(6)
      .max(20)
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required(),
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

// Validate when login
export const validateLogin = (body) => {
  const schema = Joi.object().keys({
    userName: Joi.string().required(),
    password: Joi.string().required(),
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

// Check confirm password
export const validateConfirmPassword = (password, confirmPassword) => {
  if (password != confirmPassword) {
    return false;
  }
  return true;
};

// Check information admin
export const isAdminAlreadyExists = async (
  db,
  collectionName,
  option,
  value
) => {
  const userRef: FirebaseFirestore.CollectionReference = db.collection(
    collectionName
  );
  const snapshot = await userRef.where(option, "==", value).get();
  if (snapshot.empty) {
    return false;
  }

  return true;
};

// Query admin data from firestore
export const queryAdminData = async (
  db,
  collectionName,
  userName
): Promise<AdminUser> => {
  let adminData: AdminUser = null;

  await db
    .collection(collectionName)
    .where("userName", "==", userName)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        adminData = doc.data();
      });
    })
    .catch((err) => err);

  return adminData;
};

// Update refesh token to firestore
export const updateRefeshToken = async (
  db,
  firebaseHelper,
  collectionName,
  _id,
  refeshToken
): Promise<string> => {
  return await firebaseHelper.firestore
    .updateDocument(db, collectionName, _id, {
      refeshToken: refeshToken,
    })
    .then((doc) => "Update refesh token success")
    .catch((err) => "Fail to update refesh token");
};
