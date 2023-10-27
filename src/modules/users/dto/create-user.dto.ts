import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const CreateUserSchema = z.object({
	firstName: z.string().min(3).max(255),
	email: z.string().email(),
	password: z.string().min(3).max(255),
	city: z.string().min(3).max(50).nullish(),
	postalCode: z.string().min(3).max(10).nullish(),
	phone: z.string().min(3).max(50).nullish(),
  address: z.string().min(3).max(200).nullish(),
  lang: z.string().min(2).max(2).nullish(),
});

export class CreateUserDto extends createZodDto(CreateUserSchema) {}
