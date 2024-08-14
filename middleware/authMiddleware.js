const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      const error = new Error("User is not authorized");
      error.status = 403;
      next(error);
    }

    const decodedData = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decodedData;
    next();
  } catch (e) {
    const error = new Error("User is not authorized");
    error.status = 403;
    next(error);
  }
};

module.exports = authMiddleware;
