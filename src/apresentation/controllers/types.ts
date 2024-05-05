import { type Response, type Request } from "express";

export type Controller = (req: Request, res: Response) => void;
