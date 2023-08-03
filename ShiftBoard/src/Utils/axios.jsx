import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:8080",
});
export const fetch = ({ ...options }) => {
  //client.defaults.headers.common.Authorization = "Bearer " + token;

  const onSuccess = (response) => response;
  const onError = (error) => {
    return error;
  };

  return client(options).then(onSuccess).catch(onError);
};
