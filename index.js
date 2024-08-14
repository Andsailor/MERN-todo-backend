const express = require("express");
const mongoose = require("mongoose");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");

const todoRouter = require("./routers/todo-router");
const authRouter = require("./routers/auth-router");

const PORT = process.env.PORT || 5000;
const USERNAME = process.env.MONGO_DB_USERNAME;
const PASSWORD = process.env.MONGO_DB_PASSWORD;

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth/", authRouter);
app.use("/todos/", todoRouter);

app.get("/", (req, res) => {
  res.json({ message: "Hello from server" });
});

// @MongoDB connection
main()
  .catch((err) => console.log(err))
  .finally(() => console.log("MongoDB has been connected"));

async function main() {
  await mongoose.connect(
    `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.794re5s.mongodb.net/task-tracker?retryWrites=true&w=majority&appName=Cluster0`
  );
}

// @Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
