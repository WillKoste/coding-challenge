export interface UserEntity {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	whitelisted_location: string; // If users had multiple whitelisted locations, we would create a 1:many table and join the query via the user.id
	password: string; // Always the hashed password
}
