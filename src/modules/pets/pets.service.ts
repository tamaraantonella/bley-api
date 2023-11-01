import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BreedsService } from 'breeds/breeds.service';
import { Repository } from 'typeorm';
import { UsersService } from 'users/users.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pet } from './entities/pet.entity';
import {
	ValidateRelationErrors,
	ValidateRelationsOutput
} from './types/validate-relations';

@Injectable()
export class PetsService {
	constructor(
		@InjectRepository(Pet)
		private readonly petsRepository: Repository<Pet>,
		private usersService: UsersService,
		private breedsService: BreedsService
	) {}

	async create(ownerId: string, createPetDto: CreatePetDto): Promise<Pet> {
		const validation = await this.validateRelations(
			ownerId,
			createPetDto.breedId
		);

		if (!validation) {
			throw new BadRequestException(validation);
		}

		const newPet = await this.petsRepository.save({ ownerId, ...createPetDto });
		return this.petsRepository.save(newPet);
	}

	async findAllByOwner(ownerId: string): Promise<Pet[]> {
		return this.petsRepository.findBy({ ownerId });
	}

	findAll(): Promise<Pet[]> {
		return this.petsRepository.find();
	}

	findOne(id: string): Promise<Pet> {
		return this.petsRepository.findOneBy({ id });
	}

	update(id: string, updatePetDto: UpdatePetDto) {
		return this.petsRepository.update(id, updatePetDto);
	}

	remove(id: string) {
		return this.petsRepository.softRemove({ id });
	}

	private async validateRelations(
		ownerId: string,
		breedId: number
	): Promise<ValidateRelationsOutput> {
		const errors: ValidateRelationErrors = {
			ownerId: null,
			breedId: null
		};
		const foundOwner = await this.usersService.findById(ownerId);
		if (!foundOwner) {
			errors.ownerId = 'Owner not found';
		}
		const foundBreed = await this.breedsService.findById(breedId);
		if (!foundBreed) {
			errors.breedId = 'Breed not found';
		}
		return true;
	}
}
