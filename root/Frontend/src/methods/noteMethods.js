import axios from "../api/axiosConfig.js"


const createNote = async ({title, textContent, color, label, image}) => {
    try {
        
        const response = await axios.post("/notes/create-Note", {
            title,
            textContent,
            color,
            label,
            image
        }, {
            withCredentials : true
        });

        return response.data

    } catch (error) {
        console.log("Backend Error : Create-Note : Error : ", error)
    }
}



const getUserNotes = async () => {

    try {

        const response = await axios.get("/notes/get-User-Notes", {}, {
            withCredentials : true
        })

        return response.data
        
    } catch (error) {
        console.log("Backend Error : Get-User-Notes : Error : ", error)
    }

}



const updateNote = async ({noteId, title, textContent, color, label, image}) => {

    try {

        const response = await axios.patch("/notes/update-Note", {
            noteId, 
            title, 
            textContent, 
            color, 
            label, 
            image
        }, {
            withCredentials : true
        });

        return response.data
        
    } catch (error) {
        console.log("Backend Error : Update-Note : Error : ", error)
    }

}


const deleteNote = async (noteId) => {
    try {
        
        const response = await axios.get(`/notes/delete-Note/${noteId}`, {}, {
            withCredentials : true
        });

        return response.data

    } catch (error) {
        console.log("Backend Error : Delete-Note : Error : ", error)
    }
}


export {
    createNote,
    getUserNotes,
    updateNote,
    deleteNote
}