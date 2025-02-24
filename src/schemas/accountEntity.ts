import { WithId } from 'mongodb';
import { z } from 'zod';

export const accountEntity = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export type AccountEntity = z.infer<typeof accountEntity>;
