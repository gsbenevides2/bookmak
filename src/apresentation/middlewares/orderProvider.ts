import { type NextFunction, type Request, type Response } from "express";
import { Order } from "../../business/models/Order";
import { DatabaseConnection } from "../../persistence/dbConnection";

export const orderProvider = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const handler = async (): Promise<void> => {
    const orderId = req.cookies?.orderId;
    const accountId = req.session?.accountId;
    const dataSource = await DatabaseConnection.getDataSource();
    const orderRepository = dataSource.getRepository(Order);
    if (orderId == null) {
      const order = orderRepository.create();
      await orderRepository.save(order);
      res.cookie("orderId", order.id);
      next();
      return;
    }
    const order = await orderRepository.findOne({
      where: {
        id: orderId,
      },
      relations: ["customer"],
    });
    if (order == null) {
      const order = orderRepository.create();
      await orderRepository.save(order);
      res.cookie("orderId", order.id);
      next();
      return;
    }
    if (order.customer != null && order.customer.id !== accountId) {
      res.clearCookie("orderId");
      res.redirect("/");
      return;
    }
    next();
  };

  void handler();
};
