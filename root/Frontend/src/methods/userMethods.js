/*

    What to write here ? 

    => Here we have to write all of the methods which exists in the user controller in the backend. We have to write just the way the these methods will communicate with the backend and will return the response. 


*/


import axios from "../api/axiosConfig.js"



const registerUser = async ({username, password, email, fullName}) => {
    try {
        
        // somehow communicate with the backend via the url and return the response.
        // If the backend returns an error then it should be caugth in the catch block.
        // the url is : http://localhost:5000/api/v1/users/register
        // Remember this is a POST request.
        // we may use the axios or fetch to perform this .

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