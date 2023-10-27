import {
	BadRequestException,
	Injectable,
	UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from 'auth/types';
import { UsersService } from '../../users/users.service';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { PasswordService } from './password/password.service';

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService
	) {}

	async register({ email, password, ...registerData }: RegisterDto) {
		const user = await this.usersService.findByEmail(email);
		if (user) {
			throw new BadRequestException('User already exists');
		}
		const hashedPassword = await PasswordService.hashPassword(password);

		return this.usersService.create({
			...registerData,
			email,
			password: hashedPassword
		});
	}

	async login({ email, password }: LoginDto) {
		const user = await this.usersService.findByEmail(email);

		if (!user) {
			throw new UnauthorizedException('Invalid email');
		}
		const { password: userPassword, ...userData } = user;

		const isPasswordValid = PasswordService.isPasswordValid(
			password,
			userPassword
		);

		if (!isPasswordValid) {
			throw new UnauthorizedException('Invalid password');
		}

		const payload: JWTPayload = {
			id: user.id,
			email: user.email,
			role: user.role,
			firstName: user.firstName
		};

		const token = await this.jwtService.signAsync(payload);

		return {
			token,
			userData
		};
	}
}
