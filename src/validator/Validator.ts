import {
  CreateAccountInput,
  createAccountInput,
} from '../schemas/createAccountInput';

export class Validator {
  createAccountInput(data: unknown): CreateAccountInput {
    return createAccountInput.parse(data);
  }
}

export const validator = new Validator();
