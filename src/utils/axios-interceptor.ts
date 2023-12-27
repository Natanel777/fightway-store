import axios, { AxiosRequestConfig, AxiosResponse } from "axios"

const baseUrl = "http://localhost:8080/api/v1"

const client = axios.create({baseURL:baseUrl})


const onFailure = (error: any) => {
    console.log(error);
    // Re-throw the error to maintain consistent error handling
    throw error;
  };
  

  const onSuccess = (response: AxiosResponse) => {
    console.log("Request successful!");
    // Return the response to continue the promise chain
    return response;
  };

export const request = (config : AxiosRequestConfig) =>{

    //read the data from local storage:(string)
    const userData = localStorage.getItem("user") ?? `{token:''}`
    //parse
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

  // console.log("User Data:", userData);

  const user = JSON.parse(userData);
  const token = user.token;

  // Set the Authorization header only if the token is not empty
  if (token && token.trim() !== "") {
    config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
  }

  return client(config).catch(onFailure);
};

//config = {url:"/home", method:"POST", data: "some data"}
//request(config)