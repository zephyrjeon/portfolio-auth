import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { di } from '../di/di';

export async function signin(req: Request, res: Response) {
  try {
    const account = await di.authService.signin(req.body);
    const token = await di.authService.createToken({ accountId: account.id });
    di.authService.setTokenInCookie(res, token);
    res.status(StatusCodes.OK).json(account);
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST).json({ e });
  }
}
