// src/interceptors/response.interceptor.js

function ResponseInterceptorFulfilled(response) {
	// console.log("RESPONSE INTERCEPTOR FULFILLED");
	return response;
}

function ResponseInterceptorRejected(error) {
	// console.log("RESPONSE INTERCEPTOR REJECTED");

	if (error.response) {
		error.response.data = {
			...error.response.data,
			digest: error.response.headers["x-digest-header"] || "default-digest",
		};
	}
	return Promise.reject(error);
}

module.exports = {
	ResponseInterceptorFulfilled,
	ResponseInterceptorRejected,
};
