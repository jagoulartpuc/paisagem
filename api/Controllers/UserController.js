const constants = require("../config/contants");
const DAO = require("../DAO/UsersDAO");
const sha256 = require("sha256");

class UserController {
  /*  ROTAS DE FETCH:
     *  Todas as rotas de fetch lidam com informações pertinentes a vários usuários
     */

  //Fetch users
  static fetchUsers(query, callback) {
    console.log(callback);

    const orderQuery = UserController.constructOrderQuery(query);
    const whereQuery = UserController.constructWhereQuery(query);

    return DAO.fetchUsers(orderQuery, whereQuery, callback);
  }

  /*  ROTAS DE FIND:
     *  Todas as rotas de find lidam com informações pertinentes a apenas um Usuário
     */

  //Find User
  static findUser(idUser, callback) {
    return DAO.findByID(idUser, (error, data) => {
      if (!error) {
        return callback(null, data);
      } else {
        let errorObj = {
          statusDesc: constants.valueNotFound,
          statusCode: constants.errorCodeSequelize
        };
        return callback(errorObj, null);
      }
    });
  }

  static addUser(newUserData, callback) {
    console.log(newUserData);

    let salt = UserController.randomSHA256(
      constants.minRandomNumber,
      constants.maxRandomNumber
    );
    newUserData.salt = salt;
    newUserData.senha = sha256(newUserData.senha + salt);
    DAO.addUser(newUserData, (error, data) => {
      if (!error) {
        return callback(null, data);
      } else {
        let errorObj = {
          statusDesc: error,
          statusCode: constants.errorCodeSequelize
        };
        return callback(errorObj, null);
      }
    });
  }

  static updateUser(userDataToUpdate, callback) {
    DAO.updateUser(userDataToUpdate, (error, data) => {
      callback(error, data);
    });
  }

  static deleteUser(idUser, callback) {
    DAO.deleteUserBy(idUser, (error, data) => {
      callback(error, data);
    });
  }

  static constructOrderQuery(query) {
    /**
     * Construct Order Query:
     *
     * isAscending: should the ordering be ascending or descending?
     * field: order by specified field. possible values:
     *  id: id_user,
     *  name: name,
     *  username: username
     *  email: email
     */
    let orderQuery = {};

    //Decide isAscending's value. Default is ASC, if false then DESC
    orderQuery.isAscending = query.isAscending === "false" ? "DESC" : "ASC";

    switch (query.sort) {
      case "id":
        orderQuery.field = "id";
        break;

      case "name":
        orderQuery.field = "name";
        break;

      case "username":
        orderQuery.field = "username";
        break;

      case "email":
        orderQuery.field = "email";
        break;

      default:
        //Default Order Query
        orderQuery.field = "id";
    }

    console.log(orderQuery);

    return orderQuery;
  }

  static constructWhereQuery(query) {
    /**
     * Construct Where Query:
     *
     * Possible query parameters:
     * contains: searches for the string in any one of the table's fields
     */
    let whereQuery = {};
    if (query.contains !== undefined) {
      whereQuery.contains = query.contains;
    }

    console.log(whereQuery);

    return whereQuery;
  }

  static randomSHA256(low, high) {
    return sha256(UserController.randomInt(low, high));
  }

  static randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low).toString();
  }
}

module.exports = UserController;
