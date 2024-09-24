import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export function resetPassword(req: Request, res: Response): void {
  res.status(StatusCodes.OK).json(req.body);
}
