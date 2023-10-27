import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	UseGuards
} from '@nestjs/common';
import { AuthGuard } from 'auth/auth.guard';
import { Role } from 'auth/enums/role.enum';
import { JWTPayload } from 'auth/types';
import { Auth } from 'decorators/auth.decorator';
import { JwtPayload } from 'decorators/jwt-payload.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get('me')
	findMyProfile(@JwtPayload() jwtPayload: JWTPayload) {
		return this.usersService.findById(jwtPayload.id);
	}

	@Auth(Role.ADMIN)
	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.usersService.findById(id);
	}

	@Auth(Role.ADMIN)
	@Patch(':id')
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.usersService.update(id, updateUserDto);
	}

	@Auth(Role.ADMIN)
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.usersService.remove(id);
	}
}
