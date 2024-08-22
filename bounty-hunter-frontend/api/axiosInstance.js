import axios from "axios";

const axiosInstance = axios.create({
	//baseURL: "http://132.249.238.228", // Replace with your API's base URL
	baseURL: "http://10.0.2.2:8000",
	headers: { "Content-Type": "application/json" },
	proxy: false,
});

export default axiosInstance;
