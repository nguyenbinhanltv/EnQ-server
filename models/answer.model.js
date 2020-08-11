class Answer {
  constructor(options) {
    this.id = options.id; //string
    this.A = options.A; //string
    this.B = options.B; //string
    this.C = options.C; //string
    this.D = options.D; //string
    this.correctAnswer = options.correctAnswer; //Enum<A, B, C, D>
  }
}

module.exports.Answer = Answer;