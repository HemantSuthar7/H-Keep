import axios from "../api/axiosConfig.js"

const createNote = async (formData) => {
    try {
      const response = await axios.post("/notes/create-Note", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating note:", error);
      throw error;
    }
  };

const updateNote = async ( formData) => {
    try {
      console.log("the formdata before update request",formData)
      const response = await axios.patch(`/notes/update-Note`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating note:", error);
      throw error;
    }
  };

const getUserNotes = async () => {
    try {
        const response = await axios.get("/notes/get-User-Notes", {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.log("Backend Error : Get-User-Notes : Error : ", error);
    }
}

const deleteNote = async (noteId) => {
    try {
        const response = await axios.get(`/notes/delete-Note/${noteId}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.log("Backend Error : Delete-Note : Error : ", error);
    }
}

export {
    createNote,
    getUserNotes,
    updateNote,
    deleteNote
}
