import { Router } from "express";
import * as adminController from "../controllers/admin";
import { adminMiddleware } from "../middlewares/adminAuth";
const adminRouter = Router();

adminRouter.use(adminMiddleware);

adminRouter.get("/orders", adminController.getOrders);
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

adminRouter.get("/coupons", adminController.listCoupons);
adminRouter.post("/coupons/new", adminController.createCoupon);

adminRouter.get(
  "/order/:orderId/cancel",
  adminController.checkOrderIsCancelable,
);
adminRouter.post("/order/:orderId/cancel", adminController.cancelOrder);
adminRouter.get(
  "/order/:orderId/rejectCancel",
  adminController.checkOrderIsCancelable,
);

adminRouter.post(
  "/order/:orderId/rejectCancel",
  adminController.rejectCanceling,
);

export default adminRouter;
