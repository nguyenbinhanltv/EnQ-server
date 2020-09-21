import { Router } from "express";

// Controller
import * as adminController from "../../controllers/admin/admin.controller";

class UsersRoutes {
  public routes: Router;

  constructor() {
    this.routes = Router();
    this._init();
  }

  _init() {
    // For users normal
    this.routes.get("/:userId", (req, res) => {});
    this.routes.post("/", (req, res) => {});

    // For admin
    this.routes.get("/admin/me");
    this.routes.post("/admin/signup", adminController.signUp);
    this.routes.post("/admin/login", adminController.login);
    this.routes.post("/admin/logedin", adminController.verifyToken, adminController.logedIn);
  }
}

export const usersRoutes = new UsersRoutes().routes;
