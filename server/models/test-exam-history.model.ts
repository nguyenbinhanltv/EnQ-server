import { AnswerType } from "../utils/enum";
import { TestExam } from "./test-exam.model";

export interface TestExamHistory {
  _id: string; //random string
  timeStart: number; //Date seconds
  timeEnd: number; //Date seconds
  testExam: TestExam; //string
  answers: Array<AnswerType>; //Array<Enum<A, B, C, D>>
}

/**
 * @example
 */
const testExamHistory: TestExamHistory = {
  _id: "3ZfWPlCHVm4Alvzvfdly",
  timeStart: Date.now(),
  timeEnd: Date.now(),
  testExam: {
    _id: "7OlbrONIxp0CjeGWtkIw",
    questions: [
      {
        _id: "EMfVyJXLS4BZMiyZredm",
        title:
          "Are there any flowers to the left of your house? _____________.",
        type: 0,
        rank: 0,
        answer: {
          A: "Yes, there are",
          B: " Yes, there is",
          C: "No, there isn’t",
          D: "",
          correctAnswer: 0,
        },
      },
      {
        _id: "EMfVyJXLS4BZMiyZredm",
        title:
          "Are there any flowers to the left of your house? _____________.",
        type: 0,
        rank: 0,
        answer: {
          A: "Yes, there are",
          B: " Yes, there is",
          C: "No, there isn’t",
          D: "",
          correctAnswer: 0,
        },
      },
      // ...
    ],
    type: 0,
    rank: 0,
  },
  answers: [0, 1],
};
