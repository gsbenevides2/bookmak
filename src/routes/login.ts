import { Router } from "express";
import * as LoginController from "../controllers/login";

const loginRouter = Router();

loginRouter.get("/", LoginController.getLogInPageController);
loginRouter.post("/", LoginController.logInController);

loginRouter.get("/logout", LoginController.logOutController);

loginRouter.get("/register", (_req, res) => {
  res.render("login/register", { error: null });
});
loginRouter.post("/register", LoginController.registerController);

export default loginRouter;
