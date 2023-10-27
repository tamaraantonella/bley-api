import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from 'auth/auth.guard';
import { Role } from 'auth/enums/role.enum';
import { RolesGuard } from 'auth/roles.guard';
import { Roles } from './roles.decorator';

export const Auth = (role: Role) => {
	return applyDecorators(Roles(role), UseGuards(AuthGuard, RolesGuard));
};
