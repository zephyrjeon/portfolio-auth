import {
  CreateAccountInput,
  createAccountInput,
} from '../schemas/createAccountInput';
import { signinInput, SigninInput } from '../schemas/signinInput';

export class Validator {
  createAccountInput(data: unknown): CreateAccountInput {
    return createAccountInput.parse(data);
  }
  signinInput(data: unknown): SigninInput {
    return signinInput.parse(data);
  }
}

export const validator = new Validator();
