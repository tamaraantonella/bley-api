import { InjectRepository } from '@nestjs/typeorm';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import { Injectable } from '@nestjs/common';
import { Breed } from './entities/breed.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BreedsService {
	constructor(
		@InjectRepository(Breed) private readonly breedRepository: Repository<Breed>
	) {}

	create(createBreedDto: CreateBreedDto) {
		return this.breedRepository.save(createBreedDto);
	}

	findAll() {
		return this.breedRepository.find();
	}

	findById(id: number) {
		return this.breedRepository.findBy({ id });
	}

	update(id: number, updateBreedDto: UpdateBreedDto) {
		return this.breedRepository.update(id, updateBreedDto);
	}

	remove(id: number) {
		return this.breedRepository.softDelete({ id });
	}
}
