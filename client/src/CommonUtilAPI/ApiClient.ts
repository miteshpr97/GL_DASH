import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
});
const authTokenGl = window.sessionStorage.getItem("authToken");
const axiosInstance_WithToken = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    Authorization: `x-gl-Auth-Token ${authTokenGl}`,
    "Content-Type": "application/json",
  },
});

class ApiClient<T> {
  endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll_WithoutToken = () => {
    return axiosInstance.get<T[]>(this.endpoint).then((res) => res.data);
  };

  post_WithoutToken = (data: T) => {
    return axiosInstance.post(this.endpoint, data).then((res) => res.data);
  };

  getAll = () => {
    return axiosInstance_WithToken
      .get<T[]>(this.endpoint)
      .then((res) => res.data);
  };

  post = (data: T) => {
    return axiosInstance_WithToken
      .post(this.endpoint, data)
      .then((res) => res.data);
  };
}

export default ApiClient;
