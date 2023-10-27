import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { PasswordService } from './services/password/password.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from '../users/users.module';

@Module({
	imports: [
		UsersModule,
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			global: true,
			useFactory: (configService: ConfigService) => ({
				secret: configService.get<string>('auth.jwtSecret'),
				signOptions: { expiresIn: '1d' }
			})
		})
	],
	controllers: [AuthController],
	providers: [AuthService, PasswordService]
})
export class AuthModule {}
