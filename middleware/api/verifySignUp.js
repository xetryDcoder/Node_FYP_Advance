const User = require('./../../model/auth/user')

checkDuplicateUsernameOrEmail = (req, res, next) => {
  console.log(req.body.username);
  // Username
  User.findOne({username : req.body.username})
    .then((user) => {
      if (user) {
        res.status(400).send({
          message: "Failed! Username is already in use!",
        });
        return;
      }

      // Email
      User.findOne({email: req.body.email})
        .then((user) => {
          if (user) {
            res.status(400).send({
              message: "Failed! Email is already in use!",
            });
            return;
          }

          next();
        })
        .catch((err) => {
          res.status(400).send({
            message: "Failed! Email is already in use!",
          });
        });
    })
    .catch((err) => {
      res.status(400).send({
        message: "Failed! User Does't Exist",
      });
    });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!User.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i],
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted,
};

module.exports = verifySignUp;
