import { Pet } from 'pets/entities/pet.entity';
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm';

export enum UserRole {
	ADMIN = 'admin',
	USER = 'user',
	GHOST = 'ghost'
}

export enum UserLang {
	EN = 'en',
	ES = 'es'
}

@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ unique: true })
	email: string;

	@Column('varchar', { length: 25 })
	firstName: string;

	@Column('varchar', { length: 25, nullable: true })
	lastName: string;

	@Column('varchar', { length: 50, nullable: true })
	city: string;

	@Column('varchar', { length: 10, nullable: true })
	postalCode: string;

	@Column('varchar', { length: 50, nullable: true })
	phone: string;

	@Column('varchar', { length: 200, nullable: true })
	address: string;

	@Column('varchar', { length: 60 })
	password: string;

	@Column({
		type: 'enum',
		enum: UserRole,
		default: UserRole.USER
	})
	role: UserRole;

	@Column({ type: 'enum', enum: UserLang, default: UserLang.EN })
	lang: UserLang;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	modifiedAt: Date;

	@DeleteDateColumn()
	deletedAt: Date;

	@OneToMany(() => Pet, (pet) => pet.owner)
	pets: Pet[];
}
