import { Router } from "express";

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
    this.routes.post("/admin", (req, res) => {});
    this.routes.post("/admin/login", (req, res) => {});
    this.routes.post("/admin/logout", (req, res) => {});
  }
}

export const usersRoutes = new UsersRoutes().routes;