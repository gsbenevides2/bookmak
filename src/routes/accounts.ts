import { Router } from "express";
import { getMyAccountController } from "../controllers/accounts";

const accountsRouter = Router();

accountsRouter.get("/me", getMyAccountController);

export default accountsRouter;
