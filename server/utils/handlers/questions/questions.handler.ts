import * as admin from "firebase-admin";
import * as Joi from "joi";
import { resQuestion } from "../../../models/question.model";
import { pick, inRange } from "../../common";

export const validateQuestion = (body) => {
  const schema = Joi.object().keys({
    title: Joi.number().required(),
    type: Joi.string().required(),
    rank: Joi.number().required(),
    answers: Joi.array().required(),
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
}

export const isAlreadyQuestion = (body) => {

}