import { z } from 'zod';

export const createAccountInput = z.object({
  email: z
    .string({
      required_error: 'email is required',
    })
    .email('not a valid email'),
  name: z
    .string({
      required_error: 'name is required',
    })
    .min(4, 'name too short - should be 4 chars minimum'),
  password: z
    .string({
      required_error: 'password is required',
    })
    .min(8, 'password too short - should be 8 chars minimum'),
});

export type CreateAccountInput = z.infer<typeof createAccountInput>;
