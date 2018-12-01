const constants = require("../config/contants");
const jwt = require("jsonwebtoken");
const db = require("../models/index");
const ResponseHelper = require("../Helpers/ResponseHelper");
const sha256 = require("sha256");

const users = db.sequelize.model("Users");

class AuthManager {
  static ensureUserToken(req, res, next) {
    if (AuthManager.containsToken(req)) {
      jwt.verify(req.token, constants.APISecretKey, function(err, data) {
        if (err) {
          let error = {
            statusDesc: constants.invalidToken,
            statusCode: constants.errorCodeAuth
          };
          res.json(ResponseHelper.createResponse(error, null));
        } else {
          req.User = data;
          next();
        }
      });
    } else {
      let error = {
        statusDesc: constants.tokenNotFound,
        statusCode: constants.errorCodeAuth
      };
      res.json(ResponseHelper.createResponse(error, null));
    }
  }

  static generateToken(userData) {
    return jwt.sign(userData, constants.APISecretKey, {
      expiresIn: constants.sessionTime
    });
  }

  static ensureValidUser(username, password, callback) {
    users
      .findOne({
        where: { username: username },
        raw: true
      })
      .then(userFound => {
        if (
          userFound &&
          userFound.senha === sha256(password + userFound.salt)
        ) {
          delete userFound["password"];
          delete userFound["salt"];
          return callback(null, userFound);
        }
        callback(constants.authenticationFailed, null);
      })
      .catch(error => {
        callback(error.toString(), null);
      });
  }

  static containsToken(req) {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      req.token = bearerToken;
      return true;
    } else {
      return false;
    }
  }
}

module.exports = AuthManager;
