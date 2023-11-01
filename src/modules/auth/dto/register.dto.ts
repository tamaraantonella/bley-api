import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
import { UserLang } from 'users/entities/user.entity';

const RegisterSchema = z.object({
	firstName: z.string().trim().min(3).max(255),
	lastName: z.string().trim().min(3).max(255).nullish(),
	email: z.string().trim().email(),
	password: z.string().min(6).max(25),
	city: z.string().min(3).max(50).nullish(),
	postalCode: z.string().min(3).max(10).nullish(),
	phone: z.string().min(3).max(50).nullish(),
	address: z.string().min(3).max(200).nullish(),
	lang: z.enum([UserLang.EN, UserLang.ES]).default(UserLang.EN)
});

export class RegisterDto extends createZodDto(RegisterSchema) {}
