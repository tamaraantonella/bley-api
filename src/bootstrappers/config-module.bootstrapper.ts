import { ConfigModule } from '@nestjs/config';
import configuration from 'src/config/configuration';

export default () =>
	ConfigModule.forRoot({
		envFilePath: '.env',
		isGlobal: true,
		load: [configuration]
	});
