# Avoxi Coding Challenge

## Technologies

- Node.js
- Express
- Docker
- SQLite
- GeoIP Lite

## Requirements

- Customers are only permitted to log in to their whitelisted location
- We will use the IP address to determine the location. If they are in the whitelisted area, they can log in. If not, the return a 403.

## Technical Plan

- Create a simple Express API with a `POST /auth/login` route
- Create an `auth` domain directory and create the auth `service`, `route`, `handler`, & `proto` files
- Create a `login` service function
- Create a `isValidLocation` service function (in this sample project, we will use it in the `login` route, but it could also be used in an express middleware function to protect every request.)
- The `isValidLocation` should receive the IP adress (accessed via the express route's `req.ip`) and request data from the
- Create the Dockerfile

## Getting Started

1. `npm i`
2. `npm run dev` (This will generate prisma schemas, run prisma migration, & start the dev server)

## My Resources

- [Chat GPT (Round 1)](https://chatgpt.com/share/697ea053-df70-800c-a0c8-de1f2363ab7a)
- [Chat GPT (Round 2)](https://chatgpt.com/share/697ea081-bd4c-800c-bab6-d6fe2aeee6b9)
- [Prisma](https://www.prisma.io/docs/orm/overview/databases/sqlite)
- [geoip2-node SDK](https://www.npmjs.com/package/@maxmind/geoip2-node)
- [GeoIP Docs](https://dev.maxmind.com/geoip/geolocate-an-ip/web-services/)
- [Implementing gRPC](https://bhirmbani.medium.com/complete-guide-creating-apis-using-grpc-js-and-grpc-web-with-typescript-f2496c4499fb)
- [A personal project that I've been working on](https://github.com/WillKoste/pharmacy)

## Final Notes

I ended up working a little bit over 4 hours - I wanted to get as close to my vision as I could in the short timespan. Here are some of the tasks that I'd want to complete (with more time):

1. Resolve the Dockerfile issue, which prevents the server from running in the container. (the path to the prisma config file is giving me trouble after prisma generate && tsc && moving to image)
2. I wanted to finish gRPC.

Please let me know if you have any comments or questions. If you'd like to see more, I'd love to finish some of the WIP items (if given more time).
Thanks Avoxi team!



## Code Review Interview

### My General requirements

* Everything must have valid type definition. Should never rely on the `any` type as it defeats the purpose of TS.
* Variable names: should not be abbreviated, should be descriptive, should walk other engineers through the code
* All team coding starts being met (this should be automated)
* ALL GitHub Actions must pass
* Consistent patterns
* Personal Preference: A lot of the time, I would rather have a function be readable & have more lines than use syntax sure to try and condense something as small as possible. The TS file gets compiled in the end anyways.