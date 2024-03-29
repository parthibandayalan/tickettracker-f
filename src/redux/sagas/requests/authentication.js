import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export function authenticateUser(values) {
  let payload = { username: values.username, password: values.password };
  axios.defaults.withCredentials = true;
  return axios.request({
    method: "POST",
    data: payload,
    url: `${API_URL}/authenticate`,
  });
}

export function refreshToken() {
  axios.defaults.withCredentials = true;
  return axios.request({
    method: "POST",
    url: `${API_URL}/refreshtoken`,
  });
}

export function cancelToken() {
  axios.defaults.withCredentials = true;
  return axios.request({
    method: "POST",
    url: `${API_URL}/canceltoken`,
  });
}
