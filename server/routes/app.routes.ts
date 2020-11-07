import { Router } from "express";

//Routes
import { usersRoutes } from "./users/users.routes";
import { leadersRoutes } from "./leaders/leaders.routes";
import { testExamRoutes } from "./tests/tests.routes";

class AppRoutes {
  public routes: Router;
  constructor() {
    this.routes = Router();
    this._init();
  }

  private _init() {
    this.routes.use("/v1/users", usersRoutes);
    this.routes.use("/v1/leaders", leadersRoutes);
    this.routes.use("/v1/test", testExamRoutes);
    this.routes.get("/", (req, res) => {
      res.send({
        message: "This API for English and Quiz app version 1.0 ^^"
      })
    });
  }
}

export const appRoutes = new AppRoutes().routes;
