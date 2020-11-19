import { Router } from "express";

// Controller
import * as adminController from "../../controllers/admin/admin.controller";
import * as userController from "../../controllers/users/users.controller";

class UsersRoutes {
  public routes: Router;

  constructor() {
    this.routes = Router();
    this._init();
  }

  _init() {
    // For users normal
    this.routes.get("/", userController.getAllUsers)
    this.routes.get("/:userId", userController.getUser);
    this.routes.post("/", userController.createUser); // Create user data API
    this.routes.post("/:userId", userController.updateUser); // Update user data API
    this.routes.delete("/:userId", userController.deleteUser);
    /**
     * @description
     * Must has token to use this API
     */

    // For admin
    this.routes.get("/admin/me");
    this.routes.post("/admin/signup", adminController.signUp);
    this.routes.post("/admin/login", adminController.login);
    this.routes.post("/admin/logedin", adminController.verifyToken, adminController.logedIn);
  }
}

export const usersRoutes = new UsersRoutes().routes;
