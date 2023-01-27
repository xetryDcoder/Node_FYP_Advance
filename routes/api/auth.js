const verifySignUp = require("./../../middleware/api/verifySignUp");
const controller = require("./../../controller/api/auth");

//middleware
const authJwt =  require('./../../middleware/api/authJwt')

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);

  app.get(
    "/api/auth/logout",
    [authJwt.verifyToken],
    [authJwt.isLogedOut],
    controller.logout
  );
} 
 