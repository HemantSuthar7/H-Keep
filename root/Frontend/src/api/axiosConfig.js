import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'https://h-keep-backend.onrender.com/api/v1', // Backend API URL
  withCredentials: true, // Ensures cookies are sent with requests
  timeout: 10000, // Request timeout (10 seconds)
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
    
    // Attach AccessToken either in the Authorization header or cookies
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`; // Middleware checks this
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor to handle token refresh on 401 responses
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Refresh the token
        const response = await axios.post(
          'https://h-keep-backend.onrender.com/api/v1/users/refresh-access-token', // Backend refresh token URL
          {},
          {
            withCredentials: true, // Ensures refresh token is sent with the request
          }
        );

        const { accessToken: newAccessToken } = response.data;

        // Store the new access token in cookies
        document.cookie = `AccessToken=${newAccessToken}; path=/;`;

        // Update the Authorization header and retry the original request
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest); // Retry the request with the new token
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
