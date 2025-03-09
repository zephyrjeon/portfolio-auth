import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { di } from '../di/di';

export async function signup(req: Request, res: Response) {
  try {
    const newAccount = await di.authService.createAccount(req.body);
    const token = await di.authService.createToken({
      accountId: newAccount.id,
    });
    di.authService.setTokenInCookie(res, token);
    res.status(StatusCodes.OK).json(newAccount);
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST).json({ e });
  }
}
