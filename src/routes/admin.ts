import { Router } from "express";
import { adminMiddleware } from "../middlewares/adminAuth";
import * as adminController from "../controllers/admin";
const adminRouter = Router();

adminRouter.use(adminMiddleware);

adminRouter.get("/", adminController.getOrders);
adminRouter.get("/order/:orderId", adminController.getDataFromOrder);
adminRouter.get(
  "/order/:orderId/aprovePayment",
  adminController.checkOrderIsPayable,
);
adminRouter.get(
  "/order/:orderId/rejectPayment",
  adminController.checkOrderIsPayable,
);
adminRouter.post(
  "/order/:orderId/aprovePayment",
  adminController.aprovePayment,
);
adminRouter.post(
  "/order/:orderId/rejectPayment",
  adminController.rejectPayment,
);
adminRouter.get(
  "/order/:orderId/startPreparing",
  adminController.checkOrderIsPayed,
);
adminRouter.post(
  "/order/:orderId/startPreparing",
  adminController.registerOrderPreparing,
);
adminRouter.get(
  "/order/:orderId/sendOrder",
  adminController.checkOrderIsInPreparableState,
);
adminRouter.post("/order/:orderId/sendOrder", adminController.sendOrder);
adminRouter.get(
  "/order/:orderId/sendedOrder",
  adminController.checkOrderIsSended,
);
adminRouter.post("/order/:orderId/sendedOrder", adminController.finishOrder);
adminRouter.get(
  "/order/:orderId/rejectExchange",
  adminController.checkOrderIsExchangeable,
);
adminRouter.post(
  "/order/:orderId/rejectExchange",
  adminController.rejectExchange,
);
adminRouter.get(
  "/order/:orderId/aproveExchange",
  adminController.checkOrderIsExchangeable,
);
adminRouter.post(
  "/order/:orderId/aproveExchange",
  adminController.aproveExchange,
);

export default adminRouter;
