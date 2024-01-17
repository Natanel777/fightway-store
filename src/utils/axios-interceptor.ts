import axios, { AxiosRequestConfig } from "axios";

const baseUrl = "http://localhost:8080/api/v1"

const client = axios.create({ baseURL: baseUrl })


const onFailure = (error: any) => {
  throw error;
};


export const request = (config: AxiosRequestConfig) => {

  //read the data from local storage:(string)
  const userData = localStorage.getItem("user") ?? `{token:''}`
  const user = JSON.parse(userData);
  const token = user.token

  //interceptor: include the Authorization header in each request
  client.defaults.headers.common.Authorization = `bearer ${token}`

  return client(config).catch(onFailure)
}

export const postRequest = (url: string, data: any) => {
  const config: AxiosRequestConfig = {
    method: "post",
    url,
    data,
  };
  return request(config);
};





export const requestNoAuth = (config: AxiosRequestConfig) => {
  const userData = localStorage.getItem("user") ?? `{ "token": "" }`;
  const user = JSON.parse(userData);
  const token = user.token;

  // Set the Authorization header only if the token is not empty
  if (token && token.trim() !== "") {
    config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
  }

  return client(config).catch(onFailure);
};
