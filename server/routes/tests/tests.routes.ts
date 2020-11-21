import { Router } from "express";
import * as testController from "../../controllers/testExam/testExam.controller";

class TestExamRoute {
  public routes: Router;

  constructor() {
    this.routes = Router();
    this._init();
  }

  _init() {
    //admin
    this.routes.get("/question/:questionId", testController.getQuestionByID);
    this.routes.get("/questions", testController.getAllquestion);
    this.routes.post("/question", testController.addQuestion);
    this.routes.post("/question/:questionId", testController.editQuestionById);
    this.routes.delete("/question/:questionId", testController.deleteQuestionById);
    //mobile
    this.routes.get("/test-exam-rank", testController.getTestExamByRank);
    this.routes.get("/test-exam-type", testController.getTestExamByType);
    this.routes.get("/test-exam", testController.getTestExamByTypeAndRank)
  }
}

export const testExamRoutes = new TestExamRoute().routes;
