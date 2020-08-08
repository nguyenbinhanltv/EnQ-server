export class Leaders {
  constructor(options) {
    this.id = options.id; //string
    this.userId = options.userId; //Array<User.id>
    this.startAt = options.startAt; //string
    this.endAt = options.endAt; //string
  }
}