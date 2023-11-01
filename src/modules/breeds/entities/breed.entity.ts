import { Pet } from 'pets/entities/pet.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Breed {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column('varchar', { length: 50, nullable: false })
	name: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	modifiedAt: Date;

	@DeleteDateColumn()
	deletedAt: Date;

	@OneToMany(() => Pet, (pet) => pet.breed)
	pets: Pet[];
}
