import argon2 from "argon2";
import { ErrorMessage, LoginServiceProps } from "./auth.types.js";
import { geoIp } from "../../../maxmindClient.js";
import { prisma } from "../../../index.js";
import { whitelisted_location } from "../../../generated/index.js";

/**
 * General Note:
 * I have seen applications which separate each function into their own file and ones that pack every service/handler/route/etc into a single file.
 * Here are the pos and cons of each:
 *
 * Large Single File:
 * Pros: Your app doesn't get cluttered with a million different files and inconsistent file names
 * Cons: It can be annoying to find a specific function when the file gets larger, unit tests also get difficult to look at
 *
 * Single File
 * Pros: Keep files readable, keep unit tests readable, easier to mentally separate each single principal function.
 * Cons: Tendency for sloppy file naming, your app has a million different files
 *
 * What I Recommend/Prefer:
 * Maintaining a consistent directory naming schema, but each function should live in its own file.
 * Example: `/domains/user/service/...`, `/domains/auth/service/...`, `/domains/account/service/...`
 *
 * Then to ensure all services stay in the same namespace, put this in `/domains/user/index.ts`:
 * ```ts
 * export * as UserService from '/domains/user/service
 * ```
 */

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

  // The maxmind client library uses this funky double await syntax - this should be made into a single utility function.
  const client = await geoIp;
  // It claims that `await` has no effect on the expression, but it most certainly does
  const country = await client.country(ip);
  return country.country.names.en;
};

export const validateWhitelistedIP = async (
  ip: string,
  validUserLocations: Pick<whitelisted_location, "id" | "country_name" | "is_valid">[], // Avoid inline type definition. Define it above or in a `types` file
) => {
  const ipCountry = await getCountryByIP(ip);
  const isValidLocation = validUserLocations.some(
    (location) => location.country_name === ipCountry && location.is_valid,
  );
  if (!isValidLocation) throw new Error(`[auth.service.validateWhitelistedIP] Error - ${ErrorMessage.BAD_REQUEST}`);
};

export const login = async (params: LoginServiceProps) => {
  const { email, ip, password } = params;

  // This could be made into a `getUser()` service function, but all it would really be doing is routing the Prisma args into the ORM function.
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      email: true,
      password: true, // Make sure this doesn't make it to the frontend,
      whitelisted_locations: {
        select: {
          id: true,
          is_valid: true,
          country_name: true,
        },
      },
    },
  });

  console.log("The user: ", user);

  if (!user || !password) {
    throw new Error(`[auth.service.login] Error - ${ErrorMessage.INVALID_CREDENTIALS}`);
  }

  await validatePassword(password, user.password);
  await validateWhitelistedIP(ip, user.whitelisted_locations);
  return {
    id: user.id,
    email: user.email,
    whitelisted_location: user.whitelisted_locations,
  };
};
