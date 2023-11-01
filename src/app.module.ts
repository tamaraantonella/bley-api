import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { PetsModule } from './modules/pets/pets.module';
import { UsersModule } from './modules/users/users.module';
import { VetsModule } from './modules/vets/vets.module';

import configModuleBootstrapper from './bootstrappers/config-module.bootstrapper';
import typeormModuleBootstrapper from './bootstrappers/typeorm-module.bootstrapper';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { BreedsModule } from './modules/breeds/breeds.module';

@Module({
	imports: [
		configModuleBootstrapper(),
		typeormModuleBootstrapper(),
		UsersModule,
		AuthModule,
		PetsModule,
		VetsModule,
		BreedsModule
	],
	providers: [{ provide: APP_PIPE, useClass: ZodValidationPipe }]
})
export class AppModule {}
