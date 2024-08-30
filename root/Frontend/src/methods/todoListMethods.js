import axios from "../api/axiosConfig.js"

const createList = async ({title, todoItems, label, color, image}) => {
    try {

        const response = await axios.post("/lists/create-TodoList", {
            title,
            todoItems,
            label,
            color,
            image
        }, {
            withCredentials : true
        })


        return response.data
        
    } catch (error) {
        console.log("Backend Error : Create-List : Error : ", error)
    }
}


const updateList = async ({todoListId, title, todoItems, label, color, image}) => {
    try {

        const response = await axios.patch("/lists/update-TodoList", {
            todoListId, 
            title, 
            todoItems, 
            label, 
            color, 
            image
        }, {
            withCredentials : true
        });

        return response.data
        
    } catch (error) {
        console.log("Backend Error : Update-List : Error : ", error)
    }
}



const deleteList = async (todoListId) => {
    try {

        const response = await axios.get(`/lists/delete-TodoList/${todoListId}`, {}, {
            withCredentials : true
        });

        return response.data
        
    } catch (error) {
        console.log("Backend Error : Delete-List : Error : ", error)
    }
}

export {
    createList,
    updateList,
    deleteList
}