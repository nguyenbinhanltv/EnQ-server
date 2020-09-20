import { AnswerType } from '../utils/enum';

export interface TestExamHistory {
  id: string, //random string
  timeStart: string, //Date
  timeEnd: string, //Date
  testExamId: string, //string
  answers: Array<AnswerType>, //Array<Enum<A, B, C, D>>
}