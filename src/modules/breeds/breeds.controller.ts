import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	ParseIntPipe
} from '@nestjs/common';
import { BreedsService } from './breeds.service';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import { AuthGuard } from 'auth/auth.guard';
import { Auth } from 'decorators/auth.decorator';
import { Role } from 'auth/enums/role.enum';

@UseGuards(AuthGuard)
@Controller('breeds')
export class BreedsController {
	constructor(private readonly breedsService: BreedsService) {}

	@Auth(Role.ADMIN)
	@Post()
	create(@Body() createBreedDto: CreateBreedDto) {
		return this.breedsService.create(createBreedDto);
	}

	@Get()
	findAll() {
		return this.breedsService.findAll();
	}

	@Get(':id')
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.breedsService.findById(id);
	}

	@Auth(Role.ADMIN)
	@Patch(':id')
	update(
		@Param('id', ParseIntPipe) id: number,
		@Body() updateBreedDto: UpdateBreedDto
	) {
		return this.breedsService.update(id, updateBreedDto);
	}

	@Auth(Role.ADMIN)
	@Delete(':id')
	remove(@Param('id', ParseIntPipe) id: number) {
		return this.breedsService.remove(id);
	}
}
