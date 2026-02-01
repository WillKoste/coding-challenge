import tseslint from 'typescript-eslint';

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export default [
	js.configs.recommended,
	...tseslint.configs.recommended,
	{
		ignores: ['dist/**']
	}
];
