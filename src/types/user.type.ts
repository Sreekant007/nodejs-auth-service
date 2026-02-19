import { z } from 'zod';

export const CreateUserSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must at least 8 characters'),
  roleId: z.string().uuid('Invaild role id'),
});
