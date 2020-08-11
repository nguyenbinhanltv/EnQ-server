class TestExamHistory {
  constructor(options) {
    this.id = options.id; //string
    this.timeStart = options.timeStart; //string
    this.timeEnd = options.timeEnd; //string
    this.testExamId = options.testExamId; //string
    this.answers = options.answers; //Array<Enum<A, B, C, D>>
  }
}

module.exports.TestExamHistory = TestExamHistory;