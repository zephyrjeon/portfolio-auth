import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';
import { DI } from '../di/di';
import { IAccountRepository } from '../repositories/AccountRepository';
import { CreateAccountInput } from '../schemas/createAccountInput';

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
}
