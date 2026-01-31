import path from 'node:path';
import {defineConfig} from 'prisma/config';

export default defineConfig({
	schema: path.join('src', 'schema', 'schema.prisma'),
	migrations: {
		path: path.join('src', 'migrations')
	}
});
