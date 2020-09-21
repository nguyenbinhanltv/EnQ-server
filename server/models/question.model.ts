import { AnswerType, Rank, QuestionType } from "../utils/enum";

interface Answer {
  A: string; //string
  B: string; //string
  C: string; //string
  D: string; //string
  correctAnswer: AnswerType; //A, B, C, D
}

export interface Question {
  _id: string; //string
  title: string; //string
  type: QuestionType; //enum {GRAMMAR, VOCABULARY}
  rank: Rank; //enum {EASY, NORMAL, HARD}
  answer: Answer; //Array<Answer>
}

/**
 * @example
 */
const question: Question = {
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
};
