import {describe, expect, it} from 'vitest';
import {getCountryByIP, validatePassword, validateWhitelistedIP} from './auth.service.js';
import {ErrorMessage} from './auth.types.js';

describe('auth.service', async () => {
	it('should pass', () => {
		const result = true;
		const expected = true;
		expect(result).toEqual(expected);
	});

	// NOTE: My MaxMind license key does not work unless I purchase it -- this would be where I write integration tests
	describe('getCountryByIp', () => {
		it('should return China', async () => {
			const result = await getCountryByIP('123.123.123.123');
			const expected = 'China';

			expect(result).toEqual(expected);
		});
		it('should return United States', async () => {
			const result = await getCountryByIP('174.143.169.143');
			const expected = 'United States';

			expect(result).toEqual(expected);
		});
		it('should return France', async () => {
			const result = await getCountryByIP('85.25.43.84');
			const expected = 'France';

			expect(result).toEqual(expected);
		});
		it('should throw if ip is not in the database', async () => {
			await expect(() => getCountryByIP('247.66.135.66')).rejects.toThrow('The address 247.66.135.66 is not in the database');
		});
	});

	describe('validateWhitelistedIP', () => {
		it('should return as valid (China)', async () => {
			const result = await validateWhitelistedIP('123.123.123.123', 'China');
			const expected = true;
			expect(result).toBe(expected);
		});
		it('should return as valid (United States)', async () => {
			const result = await validateWhitelistedIP('174.143.169.143', 'United States');
			const expected = true;
			expect(result).toBe(expected);
		});
		it('should return as invalid (United States)', async () => {
			const result = await validateWhitelistedIP('174.143.169.143', 'France');
			const expected = false;
			expect(result).toBe(expected);
		});
	});

	// describe('validatePassword', () => {
	// 	// it('should fail password validation', async () => {
	// 	// 	await expect(() => validatePassword('Hello1234!', '$$argon2id$v=19$m=65536,t=3,p=4$ZjyrVM5Hvq31bGK1zHEzpQ$V/PLoSp6DDFk1MhEglOqpdSNoLFnqgtsdbrjWhtYUWs')).rejects.toThrowError(ErrorMessage.INVALID_CREDENTIALS);
	// 	// });
	// 	// it('should validate password successfully', async () => {
	// 	// 	const result = await validatePassword('Hello1234!', '$argon2id$v=19$m=65536,t=3,p=4$ZjyrVM5Hvq31bGK1zHEzpQ$V/PLoSp6DDFk1MhEglOqpdSNoLFnqgtsdbrjWhtYUWs');
	// 	// });
	// });
});
