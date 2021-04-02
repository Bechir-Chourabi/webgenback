const controller = require("../controllers/auth.controller");

const { verifySignUp } = require("../middlewares");

module.exports = function(app) {
  app.use(function(req, res, next) {
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
      
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );
  app.post("/api/auth/updateuser", controller.updateUser);
  //app.post("admin",controller1.addSkill);

  app.post("/api/auth/signin", controller.signin);  

};
