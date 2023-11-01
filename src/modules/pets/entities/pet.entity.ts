import { Breed } from 'breeds/entities/breed.entity';
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm';
import { User } from 'users/entities/user.entity';

export enum PetGender {
	MALE = 'male',
	FEMALE = 'female',
	UNKNOWN = 'unknown'
}

@Entity()
export class Pet {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('varchar', { length: 25, nullable: false })
	name: string;

	@ManyToOne(() => Breed, (breed) => breed.pets)
	breed: Breed;

	@Column('integer', { nullable: false })
	breedId: number;

	@ManyToOne(() => User, (user) => user.pets)
	owner: User;

	@Column('string', { nullable: false })
	ownerId: string;

	@Column('integer', { nullable: false })
	specieId: number;

	@Column('string')
	image: string;

	@Column('integer')
	age: number;

	@Column({ type: 'enum', enum: PetGender, default: PetGender.UNKNOWN })
	gender: PetGender;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	modifiedAt: Date;

	@DeleteDateColumn()
	deletedAt: Date;
}
