import { createZodDto } from 'nestjs-zod';
import { PetGender } from 'pets/entities/pet.entity';
import { z } from 'zod';

export const CreatePetSchema = z.object({
	name: z.string().min(3).max(255),
	breedId: z.number().int(),
	specieId: z.number().int(),
	image: z.string().url().nullish(),
	age: z.number().int().min(0).max(100).optional(),
	gender: z.enum([PetGender.FEMALE,PetGender.MALE, PetGender.UNKNOWN]).optional()
});

export class CreatePetDto extends createZodDto(CreatePetSchema) {}
