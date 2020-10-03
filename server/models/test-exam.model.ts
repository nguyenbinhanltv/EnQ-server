import { Question } from "./question.model";
import { Rank, QuestionType } from '../utils/enum';

export interface TestExam {
  _id: string; //string
  questions: Array<Question>; //Array<Question>
  type: QuestionType; //enum {GRAMMAR, VOCABULARY}
  rank: Rank; //enum {EASY, NORMAL, HARD}
}

/**
 * @example
 */
const testExam: TestExam = {
  _id: "7OlbrONIxp0CjeGWtkIw",
  questions: [
    {
      _id: "EMfVyJXLS4BZMiyZredm",
      title: "Are there any flowers to the left of your house? _____________.",
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
      title: "Are there any flowers to the left of your house? _____________.",
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
  rank: 0
};
