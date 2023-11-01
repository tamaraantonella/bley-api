import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from 'auth/auth.guard';
import { Role } from 'auth/enums/role.enum';
import { RolesGuard } from 'auth/roles.guard';
import { Roles } from './roles.decorator';

/** This decorator receives
 * a `role` as a parameter and
 * applies the Roles decorator, that adds the role
 * then the guards will identify if the user has the role to access
 * to the route handler.
 */
export const Auth = (role: Role) => {
	return applyDecorators(Roles(role), UseGuards(AuthGuard, RolesGuard));
};
