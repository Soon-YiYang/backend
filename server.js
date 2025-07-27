const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
const issuesRoutes = require("./routes/issues");
const usersRoutes = require("./routes/users");

//Use routes
app.use("/api/issues", issuesRoutes);
app.use("/api/users", usersRoutes);

//Basic check to be shown on the localhost webpage
app.get("/", (req, res) => {
  res.json({ message: "Cloud Project Backend API is running!" });
});

//Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
