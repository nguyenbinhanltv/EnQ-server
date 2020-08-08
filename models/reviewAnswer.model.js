export class ReviewAnswer {
  constructor(options) {
    this.id = options.id; //string
    this.answers = options.answers; //Array<Enum<A, B, C, D>>
    this.correctAnwsers = options.correctAnwsers; //Array<Enum<A, B, C, D>>
  }
}