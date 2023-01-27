const jwt = require("jsonwebtoken");
const config = require("./../../config/config");
const User = require("./../../model/auth/user");
const Logout = require("./../../model/api/logout");

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isLogedOut = (req, res, next) => {
  let token = req.headers["x-access-token"];

  Logout.findOne({ jwtToken: token })
    .then((result) => {
      if (!result) {
        next();
      } else {
        return res.status(400).send({
          message: "Failed to authorize!",
        });
      }
    })
    .catch((err) => {
      res.send({
        message: "Invalid Token!",
      });
      return;
    });
};


const authJwt = {
  verifyToken: verifyToken,
  isLogedOut: isLogedOut,
};
module.exports = authJwt;
