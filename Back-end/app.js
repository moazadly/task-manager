const express = require("express");
const cors = require("cors");

const app = express();
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const authMiddleware = require("./controllers/authMiddleware");

const PORT = 5000;
connectDB();

app.use(cors());

app.use(express.json());

// Define a simple route
app.use("/api/auth", authRoutes);
app.use("/api/task", authMiddleware, taskRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
