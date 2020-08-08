export class TestExam {
  constructor(options) {
    this.id = options.id; //string
    this.questions = options.questions; //Array<Question>
    this.type = options.type; //string
    this.rank = options.rank; //string
  }
}