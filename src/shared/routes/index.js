import { Router } from "express";
import ensureAuthenticated from "@shared/infrastructure/http/middlewares/ensureAuthenticated";

const routes = Router();

routes.use("/postImages", ensureAuthenticated);
