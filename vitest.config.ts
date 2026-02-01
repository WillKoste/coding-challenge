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
		env: {
			MAX_MIND_ACCOUNT_ID: '1291087',
			MAX_MIND_LICENSE_KEY: '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'
		},
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
