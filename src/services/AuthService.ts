import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';
import { CookieOptions, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { DI } from '../di/di';
import { IJWTPayload } from '../interfaces/interfaces';
import { IAccountRepository } from '../repositories/AccountRepository';
import { CreateAccountInput } from '../schemas/createAccountInput';
import { SigninInput } from '../schemas/signinInput';

export class AuthService {
  constructor(private di: DI, private accountRepo: IAccountRepository) {}

  async createAccount(input: CreateAccountInput) {
    const validated = this.di.validator.createAccountInput(input);
    const existing = await this.accountRepo.findOneByEmail(validated.email);

    if (existing) throw new Error('Registered email');

    const saltedHashPassword = await this.genSaltedHashPassword(
      validated.password
    );

    const newAccount = await this.accountRepo.create({
      ...validated,
      password: saltedHashPassword,
    });

    return newAccount;
  }

  genSaltedHashPassword(password: string) {
    const salt = randomBytes(16).toString('hex');
    const buffer = scryptSync(password, salt, 64);
    return `${buffer.toString('hex')}.${salt}`;
  }

  comparePassword(storedPassword: string, suppliedPassword: string) {
    const [saltedHashpassword, salt] = storedPassword.split('.');
    const storedPasswordBuffer = Buffer.from(saltedHashpassword, 'hex');
    const suppliedPasswordBuffer = scryptSync(suppliedPassword, salt, 64);
    return timingSafeEqual(
      new Uint8Array(storedPasswordBuffer),
      new Uint8Array(suppliedPasswordBuffer)
    );
  }

  async signJWT(
    payload: string | Buffer | object,
    secret: jwt.Secret,
    options: jwt.SignOptions = {}
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, secret, options, (err, token) => {
        if (token) {
          resolve(token);
        } else {
          reject(err || 'Unknown JWT sign error');
        }
      });
    });
  }

  async verifyJWT(token: string, secret: jwt.Secret) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, (err, payload) => {
        if (payload) {
          resolve(payload);
        } else {
          reject(err || 'Unknown JWT verify error');
        }
      });
    });
  }

  async createToken(payload: IJWTPayload) {
    return this.signJWT(payload, this.di.configs.JWT_SECRET, {
      expiresIn: this.di.configs.JWT_EXPERATION_TIME,
    });
  }

  setTokenInCookie(
    res: Response,
    token: string,
    options: CookieOptions = {
      signed: true,
      secure: true, // inaccessible to JavaScript
      httpOnly: true, // only sent to the server with an encrypted request over the HTTPS protocol.
      maxAge: 24 * 60 * 60 * 1000,
    }
  ) {
    return res.cookie('TOKEN', token, options);
  }

  clearTokenInCookie(res: Response) {
    return res.clearCookie('TOKEN');
  }
}
