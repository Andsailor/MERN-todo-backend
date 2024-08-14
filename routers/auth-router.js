const express = require("express");
const authController = require("../controllers/auth-controller");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/login", authController.logIn);

router.post("/registration", authController.createUser);

router.get("/users/:user", authMiddleware, authController.getUser);

module.exports = router;
