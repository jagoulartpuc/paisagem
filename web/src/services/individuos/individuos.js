import axios from "axios";
import * as crypto from "crypto-js";
import { api } from "configs/";
import { HTTPStatusCodes } from "configs/constants";
//import * as querystring from 'querystring'

export const getImageByIndividuos = async id => {
    const response = await axios({
        method: "get",
        url: `${api}/especies/individuo/imagens/${id}`,
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