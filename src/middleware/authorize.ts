import {AuthToken, ErrorMessage, Role} from '../domains/auth/auth.types.js';
import {Request, NextFunction, Response} from 'express';
import jwt from 'jsonwebtoken';
import {routesByRole} from '../config/routesByRole.js';
import {validateWhitelistedIP} from '../domains/auth/auth.service.js';

const MOCK_COOKIE: AuthToken = {
	accountId: 1,
	userId: 2,
	location: 'Charleston',
	role: Role.EMPLOYEE,
	exp: 1772238866,
	iat: 1769560466
};

export const authorize = async (req: Request<{thing: string}>, res: Response, next: NextFunction) => {
	const MOCK_JWT = jwt.sign(MOCK_COOKIE, process.env.JWT_SECRET);
	const token = MOCK_JWT; // req.cookies['x-auth-token']
	const decoded = jwt.verify(token, process.env.JWT_SECRET) as AuthToken | undefined; // I don't like casting right here, but even though there's a time limitation, I want type safety

	if (!decoded) {
		throw new Error(ErrorMessage.UNAUTHORIZED);
	}

	if (!routesByRole[req.route].includes(decoded.role)) {
		throw new Error(ErrorMessage.UNAUTHORIZED);
	}

	// WARNING: We need a new service that takes in the location name (instead of an array of valid whitelisted_locations)
	// await validateWhitelistedIP(req.ip, decoded.location);
	next();
};
