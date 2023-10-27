import { Injectable } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class PasswordService {
	static hashPassword(password: string): Promise<string> {
		return bcryptjs.hash(password, 10);
	}

  static isPasswordValid(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcryptjs.compare(password, hashedPassword);
  }
}
