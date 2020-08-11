class Question {
  constructor(options) {
    this.id = options.id; //string
    this.title = options.title; //string
    this.type = options.type; //string
    this.rank = options.rank; //string
    this.answer = options.answer; //Array<Answer.id>
  }
}

module.exports.Question = Question;