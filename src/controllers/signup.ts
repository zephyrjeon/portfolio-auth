import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export function signup(req: Request, res: Response): void {
  console.log(5, req.body);
  res.status(StatusCodes.OK).json(req.body);
}
