import axios from "axios";

const axiosInstance = axios.create({
    baseURL : "my backend url goes here",
    withCredentials : true,
    timeout : 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
  
      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        try {
          const response = await axios.post(
            'http://your-backend-url/api/auth/refresh-token',
            {},
            {
              withCredentials: true, // Ensure cookies are sent with the refresh token request
            }
          );
  
          // No need to manually handle tokens, as they are stored in cookies
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          console.error('Error refreshing token:', refreshError);
          // Optionally, handle token refresh failure (e.g., log out the user)
          return Promise.reject(refreshError);
        }
      }
  
      return Promise.reject(error);
    }
  );
  
  export default axiosInstance;