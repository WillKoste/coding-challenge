import {hash} from 'argon2';
import {ErrorMessage, LoginServiceProps} from './auth.types.js';
import {db} from '../../server.js';
import {UserEntity} from '../user/user.types.js';
import {maxMindClient} from '../../config/maxmindClient.js';

/**
 * These service functions can be used in middleware for validating the
 * user's whitelisted location on every request
 */

export const validatePassword = async (password: string, databasePassword: string) => {
	const hashedPassword = await hash(password);
	const isAuthorized = hashedPassword === databasePassword;
	if (!isAuthorized) Error(`[auth.service.validatePassword] Error - ${ErrorMessage.INVALID_CREDENTIALS}`);
};

export const validateWhitelistedIP = async (ip: string, userLocation: string) => {
	if (!ip) throw new Error(`[auth.service.validateWhitelistedIP] Error - ${ErrorMessage.BAD_REQUEST}`);

	const location = await maxMindClient.city(ip);
	if (!location || !location.city) {
		throw new Error(`[auth.service.validateWhitelistedIP] Error - ${ErrorMessage.SERVER_ERROR} (missing/invalid location data)`);
	}

	if (userLocation !== location.city.names.en) {
		throw new Error(`[auth.service.validateWhitelistedIP] Error - ${ErrorMessage.UNAUTHORIZED}`);
	}
	return location;
};

export const login = async (params: LoginServiceProps) => {
	const {email, ip, password} = params;
	const user = db.prepare(`SELECT * FROM users u WHERE u.email = ?`).get(email) as UserEntity | undefined;

	if (!user) {
		Error(`[auth.service.login] Error - ${ErrorMessage.INVALID_CREDENTIALS}`);
	}

	await validatePassword(password, user.password);
	await validateWhitelistedIP(ip, user.whitelisted_location);
	return user;
};
