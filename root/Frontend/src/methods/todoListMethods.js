// In todoListMethods.js
import axiosInstance from "../api/axiosConfig"

const createList = async (formData) => {
    try {
        const response = await axiosInstance.post("/lists/create-TodoList", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    } catch (error) {
        console.log("Backend Error : Create-List : Error : ", error);
        throw error; // Throw the error to handle it in the component
    }
};

const updateList = async (formData) => {
    try {
        const response = await axiosInstance.patch("/lists/update-TodoList", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    } catch (error) {
        console.log("Backend Error : Update-List : Error : ", error);
        throw error; // Throw the error to handle it in the component
    }
};

const deleteList = async (todoListId) => {
    try {
        const response = await axiosInstance.delete(`/lists/delete-TodoList/${todoListId}`);
        return response.data;
    } catch (error) {
        console.log("Backend Error : Delete-List : Error : ", error);
    }
};

export {
    createList,
    updateList,
    deleteList
};
