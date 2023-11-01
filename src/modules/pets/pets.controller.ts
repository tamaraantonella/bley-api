import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards
} from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { AuthGuard } from 'auth/auth.guard';
import { Auth } from 'decorators/auth.decorator';
import { Role } from 'auth/enums/role.enum';
import { JwtPayload } from 'decorators/jwt-payload.decorator';
import { JWTPayload } from 'auth/types';

@UseGuards(AuthGuard)
@Controller('pets')
export class PetsController {
	constructor(private readonly petsService: PetsService) {}

	@Post('create')
	create(
		@JwtPayload() jwtPayload: JWTPayload,
		@Body() createPetDto: CreatePetDto
	) {
		return this.petsService.create(jwtPayload.id,createPetDto);
  }

  @Get('my-pets')
  getMyPets(@JwtPayload() jwtPayload: JWTPayload) {
    return this.petsService.findAllByOwner(jwtPayload.id);
  }

	@Auth(Role.ADMIN)
	@Get()
	findAll() {
		return this.petsService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.petsService.findOne(id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updatePetDto: UpdatePetDto) {
		return this.petsService.update(id, updatePetDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.petsService.remove(id);
	}
}
