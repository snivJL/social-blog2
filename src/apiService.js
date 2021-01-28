import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * console.log all requests and responses
 */
api.interceptors.request.use(
  (request) => {
    console.log("Starting Request", request);
    const token = localStorage.getItem("token");
    if (token) request.headers["Authorization"] = "Bearer " + token;
    return request;
  },
  function (error) {
    console.log("REQUEST ERROR", error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    if (response.data && response.data.data.accessToken)
      localStorage.setItem("token", response.data.data.accessToken);
    return response;
  },
  function (error) {
    error = error.response.data;
    console.log("RESPONSE ERROR", error);
    return Promise.reject({ message: error.split("\n")[0] });
  }
);

export default api;
