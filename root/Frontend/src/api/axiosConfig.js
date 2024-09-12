import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'https://h-keep-backend.onrender.com/api/v1', // Update with your correct backend URL
  withCredentials: true, // Ensures cookies are sent along with requests
  timeout: 10000, // Request timeout set to 10 seconds
  headers: {}, // Headers will be dynamically updated based on tokens
});

// Interceptor to attach tokens to requests
axiosInstance.interceptors.request.use(
  (config) => {
    // Get tokens from cookies
    const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
      const [key, value] = cookie.split('=');
      acc[key] = value;
      return acc;
    }, {});

    const accessToken = cookies['AccessToken'];
    const refreshToken = cookies['RefreshToken'];

    // Attach the AccessToken to Authorization header
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    
    // Attach the RefreshToken to custom header if needed
    if (refreshToken) {
      config.headers['x-refresh-token'] = refreshToken;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor to handle token refresh on 401 responses
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Check if the error status is 401 (Unauthorized) and the request hasn't been retried yet
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Send a request to refresh the token
        const response = await axios.post(
          'https://h-keep-backend.onrender.com/api/v1/users/refresh-access-token', 
          {},
          {
            withCredentials: true,
          }
        );

        const { accessToken: newAccessToken } = response.data;

        // Store the new access token in the cookie
        document.cookie = `AccessToken=${newAccessToken}; path=/;`;

        // Update the original request with the new access token and retry it
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
