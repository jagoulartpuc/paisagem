import axios from "axios";
import * as crypto from "crypto-js";
import { api } from "configs/";
import { HTTPStatusCodes } from "configs/constants";

export const get = async id => {
    const response = await axios({
      method: "get",
      url: `${api}/nomesPopulares/${id}`,
      timeout: 5000,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
  
    console.log(response)
  
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