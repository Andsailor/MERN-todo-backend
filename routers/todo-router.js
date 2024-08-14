const express = require("express");
const todoController = require("../controllers/todo-controller");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, todoController.getTodos);

router.post("/", todoController.createTodo);

router.put("/:id", todoController.updateTodoStatus);

router.delete("/:id", todoController.deleteTodo);

module.exports = router;
