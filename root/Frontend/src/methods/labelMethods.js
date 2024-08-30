import axios from "../api/axiosConfig.js"


const createLabel = async ({labelName}) => {
    
    try {

        const response = await axios.post("/labels/create-Label", {
            labelName
        }, {
            withCredentials : true
        })

        return response.data
        
    } catch (error) {
        console.log("Backend Error : Create-Label : Error :", error)
    }

}


const getLabelData = async (labelId) => {

    try {

        const response = await axios.get(`/labels/get-Label-Data/${labelId}`, {}, {
            withCredentials : true
        } );


        return response.data
        
    } catch (error) {
        console.log("Backend Error : Get-Label-Data : Error :", error)
    }

}



const updateLabel = async ({labelId, labelName}) => {

    try {

        const response = await axios.patch("/labels/update-Label", {
            labelId, 
            labelName
        }, {
            withCredentials : true
        })

        return response.data

    } catch (error) {
        console.log("Backend Error : Update-Label : Error :", error)
    }

}


const deleteLabel = async (labelId) => {

    try {

        const response = await axios.get(`labels/delete-Label/${labelId}`, {
            withCredentials : true
        });

        return response.data
        
    } catch (error) {
        console.log("Backend Error : Delete-Label : Error :", error)
    }
    
}

export {
    createLabel,
    getLabelData,
    updateLabel,
    deleteLabel
}