import argon2 from 'argon2';
import {ErrorMessage, LoginServiceProps} from './auth.types.js';
import {geoIp} from '../../../maxmindClient.js';
import {prisma} from '../../../index.js';
import {whitelisted_location} from '../../../generated/index.js';

/**
 * These service functions can be used in middleware for validating the
 * user's whitelisted location on every request
 */

export const validatePassword = async (password: string, databasePassword: string) => {
	const isAuthorized = await argon2.verify(databasePassword, password);
	if (!isAuthorized) {
		throw new Error(`[auth.service.validatePassword] Error - ${ErrorMessage.INVALID_CREDENTIALS}`);
	}
};

export const getCountryByIP = async (ip: string) => {
	if (!ip) throw new Error(`[auth.service.getCountryByIP] Error - ${ErrorMessage.BAD_REQUEST}`);

	const client = await geoIp;
	const country = await client.country(ip);
	return country.country.names.en;
};

export const validateWhitelistedIP = async (ip: string, validUserLocations: Pick<whitelisted_location, 'id' | 'country_name' | 'is_valid'>[]) => {
	const ipCountry = await getCountryByIP(ip);
	const isValidLocation = validUserLocations.some((location) => location.country_name === ipCountry && location.is_valid);
	if (!isValidLocation) throw new Error(`[auth.service.validateWhitelistedIP] Error - ${ErrorMessage.BAD_REQUEST}`);
};

export const login = async (params: LoginServiceProps) => {
	const {email, ip, password} = params;
	const user = await prisma.user.findUnique({
		where: {
			email
		},
		select: {
			id: true,
			email: true,
			password: true, // Make sure this doesn't make it to the frontend,
			whitelisted_location: {
				select: {
					id: true,
					country_name: true,
					is_valid: true
				}
			}
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
