import * as Joi from "joi";
import Bcrypt from "bcryptjs";

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
    _id: Joi.string().required(),
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
    username: Joi.string().required(),
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
export const isAdminAlreadyExists = async (db, collectionName, option, value) => {
  const userRef = db.collection(collectionName);
  const snapshot = await userRef.where(option, "==", value).get();
  if (snapshot.empty) {
    return false;
  }

  return true;
}
