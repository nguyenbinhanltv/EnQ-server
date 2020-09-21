import { TestExamHistory } from "./test-exam-history.model";

export interface User {
  displayName: string; //string name
  email: string; //string gmail
  _id: string; //string
  photoURL: string; //string
  rank: number; //number
  point: number; //number
  testExamHistory?: Array<TestExamHistory>;
}

/**
 * @example
 */
const user: User = {
  displayName: "Sol L",
  email: "yebasolar@gmail.com",
  _id: "PLBzeFCT0PR7i1SQYBkb",
  photoURL:
    "https://lh3.googleusercontent.com/a-/AOh14GhLWdM4dY2PkM6RHZAZQF5BZmEnKkpegZGH99ub=s96-c",
  rank: 0,
  point: 0,
  testExamHistory: [
    {
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
    },
  ],
};
