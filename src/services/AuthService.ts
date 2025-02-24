import { DI } from '../di/di';
import { IAccountRepository } from '../repositories/AccountRepository';
import { CreateAccountInput } from '../schemas/createAccountInput';

export class AuthService {
  constructor(private di: DI, private accountRepo: IAccountRepository) {}

  async createAccount(input: CreateAccountInput) {
    const validated = this.di.validator.createAccountInput(input);
    const existing = await this.accountRepo.findOneByEmail(validated.email);

    if (existing) throw new Error('Registered email');

    const newAccount = await this.accountRepo.create(validated);

    return newAccount;
  }
}
