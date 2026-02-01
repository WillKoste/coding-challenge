// const {defineConfig} = require('vitest/config')
import path from 'node:path';
import {defineConfig, defaultExclude} from 'vitest/config';

const root = path.resolve(process.cwd());
const suffix = `**/*.{test,spec}.ts`;
const excludeDirs = [...defaultExclude, 'generated', 'dist', 'migrations'];

export default defineConfig({
	test: {
		root,
		include: [suffix],
		exclude: excludeDirs,
		env: {},
		coverage: {
			enabled: true,
			provider: 'v8',
			thresholds: {
				functions: 80
			},
			reportsDirectory: 'coverage',
			reporter: ['text'],
			exclude: excludeDirs
		}
	}
});
