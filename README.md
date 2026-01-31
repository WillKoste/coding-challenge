# Avoxi Coding Challenge

## Technologies

- Node.js
- Express
- Docker
- SQLite

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
