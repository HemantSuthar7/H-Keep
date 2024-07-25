import { Router } from "express";

const healthCheckRouter = Router();

healthCheckRouter.route("/health-check").get()

export default healthCheckRouter;