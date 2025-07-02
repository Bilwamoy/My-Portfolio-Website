import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().trim().min(2, { message: 'Name must be at least 2 characters long.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().trim().min(10, { message: 'Message must be at least 10 characters long.' }),
});
