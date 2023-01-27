const config = require("./../../config/config")
const User = require('./../../model/auth/user')
const Logout = require("./../../model/api/logout");
const nodemailer = require("nodemailer");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    isRole: req.body.isRole,
  })
    .then((user) => {
      res.status(400).send({ message: "User was registered successfully!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        
        return res
          .status(404)
          .send({ message: "Login Failed! Please check your input." });
      }
      
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );


      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });


      // async..await is not allowed in global scope, must use a wrapper
      async function main() {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          service: "gmail", // true for 465, false for other ports
          auth: {
            user: "ceramiclove3@gmail.com", // generated ethereal user
            pass: "jfzbejhpvunqtsxz", // generated ethereal password
          },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: '"Fred Foo 👻" <foo@example.com>', // sender address
          to: "hemantajungkarki@gmail.com", // list of receivers
          subject: "Hello ✔", // Subject line
          text: "Hello world?", // plain text body
          html: "<b>Hello world?</b>", // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      }

      main().catch(console.error);

      var authorities = [];
          authorities.push("ROLE_" + user.isRole.toUpperCase());
          res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token,
          });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Login Failed! Please check your input." });
    });
};

exports.logout = (req, res) => {
  const authHeader = req.headers["x-access-token"];

  Logout.create({
    jwtToken: authHeader,
  })
    .then((result) => {
      console.log(result);
      res.status(200).send({
        message: "User has been Logout",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Something went wrong! Not logout",
      });
    });
};
