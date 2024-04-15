import { NextFunction, Request, Response } from "express";
import { DatabaseConnection } from "../dbConnection";
import { Order } from "../models/Order";

export const orderProvider = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const handler = async (): Promise<void> => {
    const orderId = req.cookies?.orderId;
    const accountId = req.cookies?.accountId;
    const dataSource = await DatabaseConnection.getDataSource();
    const orderRepository = dataSource.getRepository(Order);
    if (orderId == null) {
      console.log("Creating new order");
      const order = await orderRepository.create();
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
      console.log("Order does not exist, creating new order");
      const order = await orderRepository.create();
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
    console.log("Order exists");
    next();
  };

  void handler();
};
