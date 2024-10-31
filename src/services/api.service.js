const axios = require("axios");
require("dotenv").config();

const {
	RequestInterceptorFulfilled,
	RequestInterceptorRejected,
} = require("../interceptors/request.interceptor");

const {
	ResponseInterceptorFulfilled,
	ResponseInterceptorRejected,
} = require("../interceptors/response.interceptor");

class ApiService {
	constructor() {
		const token = process.env.NEXT_PUBLIC_TOKEN_DEV;
		const apiUrl = process.env.NEXT_PUBLIC_URL_BE;
		this.axios = axios.create({
			baseURL: apiUrl,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});

		// Thêm interceptors
		this.axios.interceptors.request.use(
			RequestInterceptorFulfilled,
			RequestInterceptorRejected
		);
		this.axios.interceptors.response.use(
			ResponseInterceptorFulfilled,
			ResponseInterceptorRejected
		);
	}

	// Hàm POST
	post(endpoint, data) {
		return this.axios.post(endpoint, data).then((response) => response.data);
	}

	// Hàm GET
	get(endpoint, params = {}) {
		return this.axios
			.get(endpoint, { params: params })
			.then((response) => response.data);
	}
}

// Khởi tạo ApiService
const apiService = new ApiService();
module.exports = { apiService };
