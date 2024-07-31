import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./db/connect.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Routers
import {
  authRoute,
  adminRoute,
  userRoute,
  domainRoute,
  processRoute,
  questionRoute,
  answerRoute,
  gapRoute,
  notFoundRoute,
} from "./routes/index.js";

const app = express();

// Middleware
// app.use(express.static(__dirname + "/public"));

// Parse JSON
app.use(express.json());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/admins", adminRoute);
app.use("/api/domains", domainRoute);
app.use("/api/processes", processRoute);
app.use("/api/questions", questionRoute);
app.use("/api/answers", answerRoute);
app.use("/api/gaps", gapRoute);
app.use("*", notFoundRoute);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(port, () => {
      console.log(`App is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
