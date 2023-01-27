module.exports = (req, res, next) => {
      let greet = "hello"
      req.greeting = greet;
      next();
};
