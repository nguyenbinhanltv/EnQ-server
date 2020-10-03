import { Router } from "express";

//Routes
import { usersRoutes } from "./users/users.routes";
import { leadersRoutes } from "./leaders/leaders.routes";
import { testExamRoutes } from './tests/tests.routes'

class AppRoutes {
  public routes: Router;
  constructor() {
    this.routes = Router();
    this._init();
  }

  private _init() {
    this.routes.use("/users", usersRoutes);
    this.routes.use("/leaders", leadersRoutes);
    this.routes.use("/test", testExamRoutes)
  }
}

export const appRoutes = new AppRoutes().routes;
