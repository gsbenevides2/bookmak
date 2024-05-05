import { Router } from "express";
import * as LoginController from "../controllers/login";

const loginRouter = Router();

loginRouter.get("/", LoginController.getLogInPage);
loginRouter.post("/", LoginController.logIn);

loginRouter.get("/logout", LoginController.logOut);

loginRouter.get("/register", (_req, res) => {
  res.render("login/register", { error: null });
});
loginRouter.post("/register", LoginController.register);

export default loginRouter;
