import dotenv from "dotenv";
import path from "node:path";
dotenv.config({ path: path.resolve(process.cwd(), "./.env") });
import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./domains/auth/auth.route.js";
import userRoutes from "./domains/user/user.route.js";

// There should be a validation function that ensures all required env variables are defined
const PORT = process.env.PORT ?? 3000;
const STAGE = process.env.STAGE;

const app = express();

// Middleware wrapper function in another file
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan(STAGE === "production" ? "combined" : "dev"));

// Move the routes into a single file
app.use("/api/v1/auth", authRoutes); // could potentially make `/api/v1` an env variable so that it's configurable via the deployment pipeline
app.use("/api/v1/user", userRoutes);

// Could use an error handler function to ensure error consistency

app.listen(PORT, () => {
  console.log(`Express server running on port: ${PORT}, stage = ${STAGE}`);
});
