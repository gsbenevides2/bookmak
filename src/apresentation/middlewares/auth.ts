import { type NextFunction, type Request, type Response } from "express";
import { DatabaseConnection } from "../../persistence/dbConnection";
import { Customer } from "../../business/models/Customer";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const handler = async (): Promise<void> => {
    const accountIdCookie = req.cookies?.accountId;
    if (accountIdCookie == null) {
      res.redirect(
        "/login?error=Você precisa estar logado&redirectTo=" + req.originalUrl,
      );
      return;
    }
    const dataSource = await DatabaseConnection.getDataSource();
    const customer = await dataSource.getRepository(Customer).findOne({
      where: {
        id: accountIdCookie,
        isActive: true,
      },
    });
    if (customer == null) {
      res.redirect(
        "/login?error=Você precisa estar logado&redirectTo=" + req.originalUrl,
      );
      return;
    }

    next();
  };
  void handler();
};
