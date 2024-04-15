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
    const exists = await orderRepository.findOne({
      where: {
        id: orderId,
      },
    });
    if (exists == null) {
      console.log("Order does not exist, creating new order");
      const order = await orderRepository.create();
      await orderRepository.save(order);
      res.cookie("orderId", order.id);
      next();
      return;
    }
    console.log("Order exists");
    next();
  };

  void handler();
};
