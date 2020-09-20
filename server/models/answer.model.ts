import { AnswerType } from '../utils/enum';

export interface Answer {
  id: string, //string
  A: string, //string
  B: string, //string
  C: string, //string
  D: string, //string
  correctAnswer: AnswerType, //A, B, C, D
}