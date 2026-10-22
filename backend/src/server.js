import express from "express";
import cors from "cors";
import "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import questionRoutes from "./routes/questionsRoutes.js";

const app = express();

app.use(cors());
// Middleware
app.use(express.json());


// Routes
app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/users",
  userRoutes
);

app.use(
  "/api/questions",
  questionRoutes
);


// Test route
app.get("/", (req, res) => {
  res.json({
    message: "SmartDSA API running",
  });
});


const PORT = 8000;

app.listen(PORT, () => {
  console.log(
    `SmartDSA API listening on port ${PORT}`
  );
});