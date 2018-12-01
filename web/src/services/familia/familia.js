import axios from "axios";
import { api } from "configs/";
import { HTTPStatusCodes } from "configs/constants";

export const create = async familia => {
  const params = {
    ...familia
  };
  const response = await axios({
    method: "post",
    url: `${api}/familias`,
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
    url: `${api}/familias/${id}`,
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
  
  if (response) {
    const api_response = response.data;
    console.log(api_response)
    return api_response;
  } else {
    return {
      statusDesc: "Erro obtendo resposta do servidor.",
      statusCode: HTTPStatusCodes.InternalServerError
    };
  }
};

export const update = async familia => {
  const params = {
    ...familia
  };

  const response = await axios({
    method: "put",
    url: `${api}/familias`,
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
    url: `${api}/familias/`,
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
