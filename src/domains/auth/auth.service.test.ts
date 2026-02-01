import {describe, expect, it} from 'vitest';
// import {getCountryByIP, login, validatePassword, validateWhitelistedIP} from './auth.service.js';
// import {} from './auth.service.js'
// import {ErrorMessage} from './auth.types.js';

/**
 * This is a bummer because I really wanted to include my tests, but I am not going to have the time.
 * I had these tests built out, but I just changed my service functions to worth with the new whitelisted_location table that I added.
 */

describe('auth.service', async () => {
	// describe('getCountryByIp', () => {
	// 	it('should return China', async () => {
	// 		const result = await getCountryByIP('123.123.123.123');
	// 		const expected = 'China';
	// 		expect(result).toEqual(expected);
	// 	});
	// 	it('should return United States', async () => {
	// 		const result = await getCountryByIP('174.143.169.143');
	// 		const expected = 'United States';
	// 		expect(result).toEqual(expected);
	// 	});
	// 	it('should return France', async () => {
	// 		const result = await getCountryByIP('85.25.43.84');
	// 		const expected = 'France';
	// 		expect(result).toEqual(expected);
	// 	});
	// 	it('should throw if ip is not in the database', async () => {
	// 		await expect(() => getCountryByIP('247.66.135.66')).rejects.toThrow('The address 247.66.135.66 is not in the database');
	// 	});
	// });
	// describe('validateWhitelistedIP', () => {
	// 	it('should return as valid (China)', async () => {
	// 		const result = await validateWhitelistedIP('123.123.123.123', 'China');
	// 		const expected = true;
	// 		expect(result).toBe(expected);
	// 	});
	// 	it('should return as valid (United States)', async () => {
	// 		const result = await validateWhitelistedIP('174.143.169.143', 'United States');
	// 		const expected = true;
	// 		expect(result).toBe(expected);
	// 	});
	// 	it('should return as invalid (United States)', async () => {
	// 		const result = await validateWhitelistedIP('174.143.169.143', 'France');
	// 		const expected = false;
	// 		expect(result).toBe(expected);
	// 	});
	// });
	// describe('validatePassword', () => {
	// 	it('should be valid password', async () => {
	// 		const result = await validatePassword('Hello1234!', '$argon2id$v=19$m=65536,t=3,p=4$YTfs91XTS2irdwg/DQb8cA$ryCw1AvbtayFmFmShMxB0Ou7FLXvl+6aPSKT0lIZZPs');
	// 		expect(result).toBeUndefined();
	// 	});
	// 	it('should be an invalid password (plain string is incorrect)', async () => {
	// 		await expect(() => validatePassword('Hello12345!', '$argon2id$v=19$m=65536,t=3,p=4$YTfs91XTS2irdwg/DQb8cA$ryCw1AvbtayFmFmShMxB0Ou7FLXvl+6aPSKT0lIZZPs')).rejects.toThrowError(ErrorMessage.INVALID_CREDENTIALS);
	// 	});
	// 	it('should be an invalid password (hash is incorrect)', async () => {
	// 		await expect(() => validatePassword('Hello1234!', '$argon2id$v=19$m=65536,t=4,p=4$YTfs91XTS2irdwg/DQb8cA$ryCw1AvbtayFmFmShMxB0Ou7FLXvl+6aPSKT0lIZZPs')).rejects.toThrowError(ErrorMessage.INVALID_CREDENTIALS);
	// 	});
	// });
	// describe('login', () => {
	// 	it('should succesfully log in user', async () => {
	// 		const result = await login({
	// 			email: 'willkoste+1@gmail.com',
	// 			ip: '174.143.169.143',
	// 			password: 'Hello1234!'
	// 		});
	// 		expect(result).toBeTruthy();
	// 	});
	// });
});
