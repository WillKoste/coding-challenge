import { Role } from "../domains/auth/auth.types.js";

// Change to AUTHORIZED_ROLES
const AuthorizedRoles: Record<Role, Role[]> = {
  [Role.ADMIN]: [Role.ADMIN, Role.MANAGER, Role.EMPLOYEE],
  [Role.MANAGER]: [Role.MANAGER, Role.EMPLOYEE],
  [Role.EMPLOYEE]: [Role.EMPLOYEE],
};

export const routesByRole: Record<string, Role[]> = {
  "GET /user/:id": AuthorizedRoles.MANAGER,
};
