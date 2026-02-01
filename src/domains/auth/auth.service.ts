import argon2 from 'argon2';
import {ErrorMessage, LoginServiceProps} from './auth.types.js';
import {geoIp} from '../../../maxmindClient.js';
import {prisma} from '../../../index.js';
import {user} from '../../../generated/index.js';

/**
 * These service functions can be used in middleware for validating the
 * user's whitelisted location on every request
 */

export const validatePassword = async (password: string, databasePassword: string) => {
	const hashedPassword = await argon2.hash(password);
	const isAuthorized = await argon2.verify(databasePassword, password);

	// const isAuthorized = hashedPassword === databasePassword;
	console.log({isAuthorized, databasePassword, hashedPassword});
	if (!isAuthorized) {
		throw new Error(`[auth.service.validatePassword] Error - ${ErrorMessage.INVALID_CREDENTIALS}`);
	}
};

export const getCountryByIP = async (ip: string) => {
	if (!ip) throw new Error(`[auth.service.validateWhitelistedIP] Error - ${ErrorMessage.BAD_REQUEST}`);

	const client = await geoIp;
	const country = await client.country(ip);
	return country.country.names.en;
};

export const validateWhitelistedIP = async (ip: string, userLocation: string) => {
	const ipCountry = await getCountryByIP(ip);
	return ipCountry === userLocation;
};

export const login = async (params: LoginServiceProps): Promise<Pick<user, 'email' | 'id' | 'whitelisted_location'>> => {
	const {email, ip, password} = params;
	const user = await prisma.user.findUnique({
		where: {
			email
		},
		select: {
			email: true,
			password: true, // Make sure this doesn't make it to the frontend
			id: true,
			whitelisted_location: true
		}
	});

	if (!user) {
		Error(`[auth.service.login] Error - ${ErrorMessage.INVALID_CREDENTIALS}`);
	}

	await validatePassword(password, user.password);
	await validateWhitelistedIP(ip, user.whitelisted_location);
	return {
		id: user.id,
		email: user.email,
		whitelisted_location: user.whitelisted_location
	};
};
