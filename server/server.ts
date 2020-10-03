import * as admin from "firebase-admin";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";

// Key firebase
import * as serviceAccount from "./serviceAccount.json";
import { db } from "./configs/database";

// Config
import "./configs/config.ts";

// Routes
import { appRoutes } from "./routes/app.routes";

const PORT = process.env.PORT || 3000;

class ExpressApp {
  public app: express.Application;

  constructor() {
    this.app = express();
    this._init();
  }

  private _init() {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    db;
  }
}

const app = new ExpressApp().app;

app.use(appRoutes);

app.listen(PORT, () => console.log(`server running on port ${PORT}`));

export { app };
