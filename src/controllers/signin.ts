import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export function signin(req: Request, res: Response): void {
  res.status(StatusCodes.OK).json(req.body);
}
