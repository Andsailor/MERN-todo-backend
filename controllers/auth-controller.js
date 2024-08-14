const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user-schema");

const generateAccessToken = (userId) => {
  const payload = {
    userId,
  };
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "24h" });
};

const authController = {
  //* @desc - Sign in if user exist
  //* @route - POST /auth/login

  logIn: async (req, res, next) => {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ username });

      if (!user) {
        const error = new Error(`User ${username} does not exist!`);
        error.status = 400;
        return next(error);
      }

      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword) {
        const error = new Error(`Invalid password, please try again!`);
        error.status = 400;
        return next(error);
      }

      const token = generateAccessToken(user._id);

      res.status(200).json({ token: token, username: username });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },

  //* @desc - Create new user if does not exist
  //* @route - POST /auth/registration

  createUser: async (req, res, next) => {
    try {
      const { username, password } = req.body;

      const candidate = await User.findOne({ username: username });

      if (password && password.length < 3) {
        const error = new Error(`Password must contain more than 3 symbols`);
        error.status = 400;
        return next(error);
      }

      if (username && username.length < 3) {
        const error = new Error(`Username must contain more than 3 symbols`);
        error.status = 400;
        return next(error);
      }

      if (candidate) {
        const error = new Error(`User ${username} already exist`);
        error.status = 400;
        return next(error);
      }

      const hashPassword = bcrypt.hashSync(password, 7);

      const user = new User({ username, password: hashPassword });
      await user.save();

      res.status(200).json(user);
    } catch (e) {
      res.status(500).json(e);
    }
  },

  //* @desc - Get user
  //* @route - GET /auth/users

  getUser: async (req, res, next) => {
    try {
      const username = req.params.user;

      if (!username) {
        const error = new Error("User not found");
        error.status = 404;
        next(error);
      }

      const user = await User.findOne({ username });

      res.status(200).json(user);
    } catch (e) {
      res.json(e);
    }
  },
};

module.exports = authController;
