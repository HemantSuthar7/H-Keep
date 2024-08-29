import axios from "axios";

const axiosInstance = axios.create({
    baseURL : "my backend url goes here",
    withCredentials : true,
    timeout : 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
      // Get tokens from cookies
      const accessToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('accessToken='))
        ?.split('=')[1];
  
      const refreshToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('refreshToken='))
        ?.split('=')[1];
  
      // If tokens exist, add them to headers
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      if (refreshToken) {
        config.headers['x-refresh-token'] = refreshToken;
      }
  
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
  
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        try {
          // Request to refresh the token
          const response = await axios.post(
            'http://your-backend-url/api/auth/refresh-token',
            {},
            {
              withCredentials: true, // Ensures cookies are sent with the refresh token request
            }
          );
  
          const { accessToken: newAccessToken } = response.data;
  
          // Store the new access token in the cookie
          document.cookie = `accessToken=${newAccessToken}; path=/;`;
  
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