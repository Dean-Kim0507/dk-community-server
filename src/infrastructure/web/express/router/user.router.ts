import { Router } from "express";

import { getDependencyRegistryInstance } from "../../../../configuration/dependency-registry";
import { UserController } from "../controllers/user.controller";

const dependencyRegistry = getDependencyRegistryInstance();
const controller = dependencyRegistry.resolve<UserController>(UserController);
const router = Router();

router.post("/register", (req, res) => {
  
  return controller.register(req, res);
});

export { router as userRouter };
