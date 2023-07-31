import axios from "axios";

const client = axios.create({
  baseURL: "https://shiftboard-backend-06ff7b9a73e3.herokuapp.com",
});
const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMTExMUBnbWFpbC5jb20iLCJpYXQiOjE2ODM1MDA2ODQsImV4cCI6MTY4MzUwMjEyNH0.7QUaKFhzWL_vUddFFaEmhaAqw6XslYYUtm-OKeM2P40";
export const fetch = ({ ...options }) => {
  //client.defaults.headers.common.Authorization = "Bearer " + token;

  const onSuccess = (response) => response;
  const onError = (error) => {
    return error;
  };

  return client(options).then(onSuccess).catch(onError);
};
