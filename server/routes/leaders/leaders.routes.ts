import { Router } from "express";

// Controller
import * as leadersController from "../../controllers/leaders/leaders.controller";

class LeadersRoutes {
  public routes: Router;

  constructor() {
    this.routes = Router();
    this._init();
  }

  _init() {
    this.routes.get("/day", leadersController.getLeadersDay);
    this.routes.get("/week", leadersController.getLeadersWeek);
  }
}

export const leadersRoutes = new LeadersRoutes().routes;
