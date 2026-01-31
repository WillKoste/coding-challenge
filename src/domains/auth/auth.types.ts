export interface LoginBody {
	email: string;
	password: string;
}

export interface LoginServiceProps extends LoginBody {
	ip: string;
}

export enum ErrorMessage {
	BAD_REQUEST = 'Bad request',
	INVALID_CREDENTIALS = 'Invalid credentials',
	UNAUTHORIZED = 'Unauthorized',
	NOT_FOUND = 'Not found',
	SERVER_ERROR = 'Server Error'
}

export enum Role {
	EMPLOYEE = 'EMPLOYEE',
	MANAGER = 'MANAGER',
	ADMIN = 'ADMIN'
}

export interface AuthToken {
	userId: number;
	accountId: number;
	location: string;
	role: Role;
	iat: number;
	exp: number;
}
