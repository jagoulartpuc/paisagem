import axios from "axios";
import * as crypto from "crypto-js";
import { api } from "configs/";
import { HTTPStatusCodes } from "configs/constants";
//import * as querystring from 'querystring'

export const create = async (user, encryptPassword) => {
  const params = {
    ...user,
    password: encryptPassword
      ? crypto.SHA256(user.password).toString()
      : user.password
  };

  const response = await axios({
    method: "post",
    url: `${api}/users`,
    data: params,
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });

  if (response) {
    const api_response = response.data;
    if (api_response.data) {
      return response.data;
    } else {
      return {
        statusDesc: "Erro obtendo resposta do servidor.",
        statusCode: HTTPStatusCodes.InternalServerError
      };
    }
  }
};

export const read = async id => {
  const response = await axios({
    method: "get",
    url: `${api}/users/${id}`,
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });

  if (response) {
    const api_response = response.data;
    return api_response.data;
  } else {
    return {
      statusDesc: "Erro obtendo resposta do servidor.",
      statusCode: HTTPStatusCodes.InternalServerError
    };
  }
};

export const update = async (user, encryptPassword) => {
  const params = {
    ...user,
    password: encryptPassword
      ? crypto.SHA256(user.password).toString()
      : user.password
  };

  const response = await axios({
    method: "put",
    url: `${api}/users`,
    data: params,
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });

  if (response) {
    const api_response = response.data;
    if (api_response.data) {
      return response.data;
    } else {
      return {
        statusDesc: "Erro obtendo resposta do servidor.",
        statusCode: HTTPStatusCodes.InternalServerError
      };
    }
  }
};

export const listAll = async () => {
  const response = await axios({
    method: "get",
    url: `${api}/users/`,
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });

  if (response) {
    const api_response = response.data;
    return api_response;
  } else {
    return {
      statusDesc: "Erro obtendo resposta do servidor.",
      statusCode: HTTPStatusCodes.InternalServerError
    };
  }
};
