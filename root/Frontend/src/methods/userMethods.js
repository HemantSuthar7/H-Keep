/*

    What to write here ? 

    => Here we have to write all of the methods which exists in the user controller in the backend. We have to write just the way the these methods will communicate with the backend and will return the response. 


*/


import axios from "../api/axiosConfig.js"



const registerUser = async ({username, password, email, fullName}) => {
    try {
        const response = await axios.post('/users/register', {
            username,
            password,
            email,
            fullName,
          });
      
          // Return the response from the backend
          console.log(response)
          return response.data;

    } catch (error) {
        console.log("Error from Backend : Register-User Error : Error : ", error)
    }
}


const loginUser = async ({username, email, password}) => {
    try {
        
        const response = await axios.post("/users/login" , {
            username, 
            email, 
            password
        })

        return response.data

    } catch (error) {
        console.log("Error from Backend : Login-User Error : Error : ", error)
    }
}


const logoutUser = async () => {
    try {

        const response = await axios.post("/users/logout" , {
            username, 
            email, 
            password
        })

        return response.data
        
    } catch (error) {
        console.log("Error from Backend : Logout-User Error : Error : ", error)
    }
}


const refreshAccessToken = async () => {

    try {
        const response = await axios.post("/users/refresh-access-token", {}, {
            withCredentials: true
        });
    
        const {accessToken, refreshToken} = response.data;
    
        document.cookie = `accessToken=${accessToken}; path=/;`;
        document.cookie = `refreshToken=${refreshToken}; path=/;`;
    
        return accessToken;
    } catch (error) {
        console.error('Error refreshing access token:', error);
        return null; // Return null if the refresh fails (you might want to log out the user in this case)
    }

}


const changeCurrentPassword = async ({oldPassword, newPassword}) => {
    try {
        
        const response = await axios.post("/users/change-password" , {
           oldPassword,
           newPassword
        })

        return response.data;

    } catch (error) {
        console.log("Error from Backend : Change-Current-Password Error : Error : ", error)
    }
}


const getCurrentUser = async () => {
    try {

        const response = await axios.post("/users/get-current-user")

        return response.data;
        
    } catch (error) {
        console.log("Error from Backend : Get-Current-User Error : Error : ", error)
    }
}


const updateAccountDetails = async ({email, fullName}) => {
    try {

        const response = await axios.patch("/users/update-user-details", {
            email,
            fullName
        })
        
        return response.data;

    } catch (error) {
        console.log("Error from Backend : Update-Account-Details Error : Error : ", error)
    }
}


const getCurrentUserData = async () => {
    try {
        
        const response = await axios.get("/users/get-current-user-data")

        return response.data

    } catch (error) {
        console.log("Error from Backend : Get-Current-User-Data Error : Error : ", error)
    }
}

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken, // i have some doubts over the refresh token and access token transfers so any method related to tokens will be completed later on...
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    getCurrentUserData
}