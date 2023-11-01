import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const CreateBreedSchema = z.object({
	name: z.string().min(3).max(50)
});

export class CreateBreedDto extends createZodDto(CreateBreedSchema) {}
