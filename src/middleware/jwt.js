const jwt = require("jsonwebtoken");

const createToken = (user, time) => {
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: time ? time : "1d",
    noTimestamp: true,
  });
  return accessToken;
};

const validateToken = (req, res, next) => {
  const accessToken = req.headers.authorization.split(" ")[1];
  if (!accessToken) {
    res.status(403).json({ message: "Please provide an token!" });
  } else {
    try {
      const validToken = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET
      );
      req.user = validToken;
      return next();
    } catch (error) {
      next(error);
    }
  }
};

const validateSuperAdmin = (req, res, next) => {
  const accessToken = req.headers.authorization.split(" ")[1];
  if (!accessToken) {
    res.status(403).json({ message: "Please provide an token!" });
  } else {
    try {
      const validToken = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET
      );
      if (validToken.role !== "SuperAdmin") {
        throw new Error("You are not authorized to access this data!");
      } else {
        req.user = validToken;
        return next();
      }
    } catch (error) {
      next(error);
    }
  }
};

const validateAdminAndSuperAdmin = (req, res, next) => {
  const accessToken = req.headers.authorization.split(" ")[1];
  if (!accessToken) {
    res.status(403).json({ message: "Please provide an token!" });
  } else {
    try {
      const validToken = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET
      );
      if (validToken.role !== "SuperAdmin" || validToken.role !== "Admin") {
        throw new Error("You are not authorized to access this data!");
      } else {
        req.user = validToken;
        return next();
      }
    } catch (error) {
      next(error);
    }
  }
};

module.exports = {
  createToken,
  validateToken,
  validateSuperAdmin,
  validateAdminAndSuperAdmin,
};
