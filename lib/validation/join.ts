import * as z from 'zod';

// Join us form validation schema
export const JoinUsFormSchema = z.object({
  firstName: z.string().min(3, { message: 'First name is required' }),
  lastName: z.string().min(3, { message: 'Last name is required' }),
  email: z.string().email({ message: 'Enter a valid email' }),
  description: z.string().min(3, { message: 'Field is required' }),
});

export const memberCreateSchema = z.object({
  full_name: z.string(),
  email: z.string().email(),
  description: z.string()
});