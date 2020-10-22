import { AnswerType } from "../utils/enum";
import { TestExam } from "./test-exam.model";

interface TestExamHistory {
  timeStart: number; //Date seconds
  timeEnd: number; //Date seconds
  testExam: TestExam;
  answers: Array<AnswerType>; //Array<Enum<A, B, C, D>>
}

export interface User {
  displayName: string; //string name
  email: string; //string gmail
  _id?: string; //string
  photoURL: string; //string
  rank: number | 0; //number
  point: number | 0; //number
  testExamHistory?: Array<TestExamHistory>; //Maximum 5
  friend?: Array<{_id: string}> // _id of User
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
  friend: [
    {
      _id: "PLBzeFCT0PR7i1SQYBkb"
    },
    {
      _id: "PLBzeFCT0PR7i1SQYBkb"
    }
  ]
};
