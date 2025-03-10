import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { di } from '../di/di';

export async function signout(req: Request, res: Response) {
  try {
    di.authService.clearTokenInCookie(res);
    res.status(StatusCodes.OK);
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST).json({ e });
  }
}
