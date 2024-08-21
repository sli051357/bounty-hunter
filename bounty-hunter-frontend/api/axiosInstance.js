import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "http://132.249.238.228", // Replace with your API's base URL
	headers: { "Content-Type": "application/json" },
	proxy: false,
});

export default axiosInstance;
