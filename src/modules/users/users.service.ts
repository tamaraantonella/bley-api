import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserRole } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserOutput } from './types';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly usersRepository: Repository<User>
	) {}

	async create(createUserDto: CreateUserDto): Promise<CreateUserOutput> {
		const newUser = await this.usersRepository.save(createUserDto);
		return {
			id: newUser.id,
			email: newUser.email,
			firstName: newUser.firstName
		};
	}

	findAll() {
		return this.usersRepository.find();
	}

	async findById(id: string) {
		return this.usersRepository
			.createQueryBuilder('user')
			.select([
				'user.id',
				'user.email',
				'user.firstName',
				'user.city',
				'user.phone',
				'user.address'
			])
			.where('user.id = :id', { id })
			.andWhere('user.deletedAt IS NULL')
			.andWhere('user.role != :role', { role: UserRole.GHOST })
			.getOne();
	}

	findByEmail(email: string) {
		return this.usersRepository.findOneBy({ email });
	}

	update(email: string, updateUserDto: UpdateUserDto) {
		return this.usersRepository.update(email, updateUserDto);
	}

	remove(id: string) {
		return this.usersRepository.softRemove({ id });
	}
}
