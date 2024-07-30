import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./db/connect.js";
import cookie from "cookie-parser";
import session from "express-session";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Routers
import authRoute from "./routes/auth.js";
import adminRoute from "./routes/admin.js";
import userRoute from "./routes/user.js";
import questionRoute from "./routes/question.js";
import answerRoute from "./routes/answer.js";
import gapRoute from "./routes/gap.js";
import notFoundRoute from "./routes/not-found.js";
const app = express();

// Middleware
app.use(express.static(__dirname + "/public"));
// Cookie
app.use(cookie());
// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
  })
);

// Parse JSON
app.use(express.json());
// Parse Form Data
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/pertanyaan", questionRoute);
app.use("/api/jawaban", answerRoute);
app.use("/api/gap", gapRoute);
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
