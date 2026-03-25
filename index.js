require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());

const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/auth.route");
const userRoutes = require("./src/routes/user.route");
const errorHandler = require("./src/middleware/error.middleware");

connectDB();

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

app.use(errorHandler);