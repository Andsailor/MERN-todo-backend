const mongoose = require("mongoose");

//* TODO : Добавить USER в схему

const todoSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    minLength: [3, "Title is too short!"],
  },
  isDone: Boolean,
});

module.exports = mongoose.model("tasks", todoSchema);
