const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Middleware
const { notFound, errorHandler } = require("./middleware/errorHandler");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/quiz", require("./routes/quizRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.get('/', (req, res) => {
  res.send('🚀 Server is live on Render!');
});

// Error Handlers
app.use(notFound);       // 404
app.use(errorHandler);   // General error handler

module.exports = app;
