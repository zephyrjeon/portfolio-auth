import { z } from 'zod';

export const signinInput = z.object({
  email: z
    .string({
      required_error: 'email is required',
    })
    .email('not a valid email'),
  password: z
    .string({
      required_error: 'password is required',
    })
    .min(8, 'password too short - should be 8 chars minimum'),
});

export type SigninInput = z.infer<typeof signinInput>;
