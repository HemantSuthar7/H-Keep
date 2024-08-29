/*

    What to write here ? 

    => Here we have to write all of the methods which exists in the user controller in the backend. We have to write just the way the these methods will communicate with the backend and will return the response. 


*/


import axios from "../api/axiosConfig.js"



const registerUser = async ({username, password, email, fullName}) => {
    try {
        const response = await axios.post('http://localhost:5000/api/v1/users/register', {
            username,
            password,
            email,
            fullName,
          });
      
          // Return the response from the backend
          return response.data;

    } catch (error) {
        console.log("Error from Backend : Register-User Error : Error : ", error)
    }
}



const loginUser = async ({username, email, password}) => {
    try {
        
        const response = await axios.post("http://localhost:5000/api/v1/users/login" , {
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

        const response = await axios.post("http://localhost:5000/api/v1/users/logout" , {
            username, 
            email, 
            password
        })

        return response.data
        
    } catch (error) {
        console.log("Error from Backend : Logout-User Error : Error : ", error)
    }
}


// COMPLETE THIS METHOD ...
const refreshAccessToken = async () => {

}


const changeCurrentPassword = async ({oldPassword, newPassword}) => {
    try {
        
        const response = await axios.post("http://localhost:5000/api/v1/users/change-password" , {
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

        const response = await axios.post("http://localhost:5000/api/v1/users/get-current-user")

        return response.data;
        
    } catch (error) {
        console.log("Error from Backend : Get-Current-User Error : Error : ", error)
    }
}


const updateAccountDetails = async ({email, fullName}) => {
    try {

        const response = await axios.patch("http://localhost:5000/api/v1/users/update-user-details", {
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
        
        const response = await axios.get("http://localhost:5000/api/v1/users/get-current-user-data")

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