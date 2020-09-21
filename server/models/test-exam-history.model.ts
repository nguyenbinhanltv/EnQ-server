import { AnswerType } from '../utils/enum';
import { TestExam } from './test-exam.model';

export interface TestExamHistory {
  _id: string, //random string
  timeStart: string, //Date
  timeEnd: string, //Date
  testExam: TestExam, //string
  answers: Array<AnswerType>, //Array<Enum<A, B, C, D>>
}

/**
 * @example
 */
const testExamHistory: TestExamHistory = {
  _id: "",
  timeStart: "",
  timeEnd: "",
  testExam: {},
  answers: [],
};