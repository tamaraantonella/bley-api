import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Repository } from 'typeorm';
import { Pet } from './entities/pet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'users/users.service';

@Injectable()
export class PetsService {
	constructor(
		@InjectRepository(Pet)
		private readonly petsRepository: Repository<Pet>,
		private usersService: UsersService
	) {}

	async create(ownerId: string, createPetDto: CreatePetDto): Promise<Pet> {
		const foundOwner = await this.usersService.findById(ownerId);
		if (!foundOwner) {
			throw new NotFoundException('Owner not found');
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
}
