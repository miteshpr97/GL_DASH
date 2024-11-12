import axios from "axios";

const axiosInstance = axios.create({
  //baseURL: "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
const authTokenGl = window.sessionStorage.getItem("authToken");

console.log(authTokenGl);

const axiosInstance_WithToken = axios.create({
  //baseURL: "http://localhost:5000/api",
  headers: {
    "x-gl-Auth-Token": window.sessionStorage.getItem("authToken"),
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const _getAll_WithoutToken = (urlAction) => {
  return axiosInstance.get(urlAction).then((res) => res);
};

const _update_WithoutToken = (urlAction,  data = {}) => {
  return axiosInstance.put(urlAction, data).then((res) => res);
};

const _post_WithoutToken = (urlAction, data = {}) => {
  return axiosInstance.post(urlAction, data).then((res) => res);
};

const _getAll = (urlAction) => {
  return axiosInstance_WithToken.get(urlAction).then((res) => res);
};

const _post = (urlAction, data = {}) => {
  console.log("Url :", urlAction);
  return axiosInstance_WithToken.post(urlAction, data).then((res) => res);
};

export { _getAll_WithoutToken, _post_WithoutToken, _getAll, _post, _update_WithoutToken };
