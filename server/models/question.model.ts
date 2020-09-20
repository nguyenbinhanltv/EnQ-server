export interface Question {
  id: string, //string
  title: string, //string
  type: string, //string
  rank: string, //string
  answer: Array<string>, //Array<Answer.id>
}