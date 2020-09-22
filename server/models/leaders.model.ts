import { User } from "./user.model";
import { LeadersType } from "../utils/enum";

export interface Leaders {
  _id: string; //string
  users: Array<User>; //Array<User> doesn't have
  startAt: number; //Date seconds
  endAt: number; //Date seconds
  type: LeadersType; //day or week
}

/**
 * @example
 */

// Leaders type DAY
const leadersDay: Leaders = {
  _id: "9t3IrigkUum5c5u1WysQ",
  startAt: Date.now(),
  endAt: Date.now() + 86400,
  type: 0,
  users: [
    {
      displayName: "Sol L",
      email: "yebasolar@gmail.com",
      _id: "PLBzeFCT0PR7i1SQYBkb",
      photoURL:
        "https://lh3.googleusercontent.com/a-/AOh14GhLWdM4dY2PkM6RHZAZQF5BZmEnKkpegZGH99ub=s96-c",
      rank: 0,
      point: 0,
    },
    // ...
  ],
};

// Leaders type WEEK
const leadersWeek: Leaders = {
  _id: "9t3IrigkUum5c5u1WysQ",
  startAt: Date.now(),
  endAt: Date.now() + 604800,
  type: 1,
  users: [
    {
      displayName: "Sol L",
      email: "yebasolar@gmail.com",
      _id: "PLBzeFCT0PR7i1SQYBkb",
      photoURL:
        "https://lh3.googleusercontent.com/a-/AOh14GhLWdM4dY2PkM6RHZAZQF5BZmEnKkpegZGH99ub=s96-c",
      rank: 0,
      point: 0,
    },
    // ...
  ],
};
