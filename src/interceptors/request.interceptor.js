// src/interceptors/request.interceptor.js
function RequestInterceptorFulfilled(config) {
	// console.log("REQUEST INTERCEPTOR FULFILLED");
	return config;
}

function RequestInterceptorRejected(error) {
	// console.log("REQUEST INTERCEPTOR REJECTED");
	return Promise.reject(error);
}

module.exports = {
	RequestInterceptorFulfilled,
	RequestInterceptorRejected,
};
