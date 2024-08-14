const Todos = require("../models/todo-schema");
const Users = require("../models/user-schema");

const todoController = {
  //* @descr -- Get all todos array
  //* @route -- GET /todos/

  getTodos: async (req, res) => {
    try {
      const userId = req.user.userId;

      const activeUser = await Users.findById(userId);

      const todos = await Todos.find({ username: activeUser.username });

      res.status(200).json(todos);
    } catch (e) {
      res.status(500).json(e);
    }
  },

  //* @descr -- Create new todo in DB
  //* @route -- POST /todos/

  createTodo: async (req, res, next) => {
    try {
      const title = req.body.title;
      const username = req.body.username;

      if (!title) {
        const error = new Error("Please add the title");
        error.status = 404;
        return next(error);
      }

      const newTodo = new Todos({
        username: username,
        title,
        isDone: false,
      });

      await newTodo.save();

      res.status(200).json(newTodo);
    } catch (e) {
      next(e);
    }
  },

  // @descr -- Update todo status by ID
  // @route -- PUT /todos/:id

  updateTodoStatus: async (req, res, next) => {
    const id = req.params.id;

    const todoToUpdate = await Todos.findById(id);

    if (!todoToUpdate) {
      const error = new Error(`Could not find todo with id ${id}`);
      err.status = 404;
      next(error);
    }

    const udpatedTodo = await Todos.findByIdAndUpdate(
      id,
      { isDone: !todoToUpdate.isDone },
      {
        new: true,
      }
    );

    return res.status(200).json(udpatedTodo);
  },

  // @descr -- Delete todo from DB
  // @route -- DELETE /todos/:id

  deleteTodo: async (req, res) => {
    const id = req.params.id;

    const deletedTodo = await Todos.findByIdAndDelete(id);

    res.status(200).json(deletedTodo);
  },
};

module.exports = todoController;
