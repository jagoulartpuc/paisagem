const constants = require("../config/contants");
const AuthManager = require("../Helpers/AuthManager");

class LoginController {
  static login(username, password, callback) {
    AuthManager.ensureValidUser(username, password, (error, userData) => {
      if (error != null) {
        let errorObj = {
          statusDesc: error,
          statusCode: constants.errorCodeAuth
        };
        return callback(errorObj, null);
      }
      //Correct user and password
      //generate token
      let token = AuthManager.generateToken(userData);
      return callback(null, { token: token, userData: userData });
    });
  }

  static checkToken(req, res, callback) {
    AuthManager.ensureUserToken(req, res, callback);
  }
}

module.exports = LoginController;
