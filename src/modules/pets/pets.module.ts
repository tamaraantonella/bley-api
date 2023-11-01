import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';
import { UsersModule } from 'users/users.module';
import { BreedsModule } from 'breeds/breeds.module';

@Module({
  imports:[TypeOrmModule.forFeature([Pet]), UsersModule, BreedsModule],
  controllers: [PetsController],
  providers: [PetsService],
})
export class PetsModule {}
