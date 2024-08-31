import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Input, Select, RTE } from "../index";
import noteService from '../../services/noteService'; // Assuming you have a service to handle API calls

function NoteEditorForm({ note }) {
  const { register, handleSubmit, setValue, watch, formState: { errors }, control, getValues } = useForm({
    defaultValues: {
      title: note?.title || "",
      content: note?.content || "",
      label: note?.label || "",
      color: note?.color || "",
    },
  });

  const [contentError, setContentError] = useState(false);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (!data.content || data.content.trim() === "") {
      setContentError(true);
      return;
    }

    setContentError(false);

    try {
      let fileId;
      if (data.image && data.image[0]) {
        const file = await noteService.uploadFile(data.image[0]);
        fileId = file.$id;
      }

      if (note) {
        const updatedData = {
          ...data,
          image: fileId || note.image,
        };
        if (fileId) noteService.deleteFile(note.image);

        const updatedNote = await noteService.updateNote(note._id, updatedData);
        if (updatedNote) navigate(`/note/${updatedNote._id}`);
      } else {
        const newData = { ...data, image: fileId, userId: userData._id };
        const newNote = await noteService.createNote(newData);
        if (newNote) navigate(`/note/${newNote._id}`);
      }
    } catch (error) {
      console.error("Error submitting the note form:", error);
    }
  };

  useEffect(() => {
    if (note) {
      setValue("title", note.title);
      setValue("content", note.content);
      setValue("label", note.label);
      setValue("color", note.color);
    }
  }, [note, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-full md:w-2/3 px-2">
        <div className="mb-4">
          <Input
            label="Title :"
            labelClassName="text-black"
            placeholder="Title"
            className={`${errors.title ? 'border-red-500' : ''}`}
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        </div>
        <div className="mb-4">
          {contentError && <p className="text-red-500">Content is required</p>}
          <RTE
            label="Content :"
            name="content"
            control={control}
            defaultValue={getValues("content")}
            onChange={() => setContentError(false)}
          />
        </div>
      </div>
      <div className="w-full md:w-1/3 px-2 mt-4 md:mt-0">
        <div className="mb-5">
          <Input
            label="Choose File"
            labelClassName="text-black"
            type="file"
            className={`block w-full mb-5 text-sm text-gray-900 border ${errors.image ? 'border-red-500' : 'border-gray-300'} rounded-lg cursor-pointer bg-gray-50`}
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !note && "Image is required" })}
          />
          {errors.image && <p className="text-red-500">{errors.image.message}</p>}
        </div>
        {note?.image && (
          <div className="w-full mb-4">
            <img
              src={noteService.getFilePreview(note.image)}
              alt={note.title}
              className="rounded-lg"
            />
          </div>
        )}
        <div className="mb-4">
          <Select
            options={["Label 1", "Label 2", "Label 3"]} // Populate with real label options
            label="Project H-Keep"
            className={`${errors.label ? 'border-red-500' : ''}`}
            {...register("label", { required: "Label is required" })}
          />
          {errors.label && <p className="text-red-500">{errors.label.message}</p>}
        </div>
        <div className="mb-4">
          <Select
            options={["Red", "Coral", "Green"]} // Populate with real color options
            label="Color"
            className={`${errors.color ? 'border-red-500' : ''}`}
            {...register("color", { required: "Color is required" })}
          />
          {errors.color && <p className="text-red-500">{errors.color.message}</p>}
        </div>
        <Button
          className="w-full mt-4 md:mt-11 bg-red-500 text-white"
          type="button"
          onClick={() => noteService.deleteNote(note._id)}
        >
          Delete
        </Button>
        <Button
          className="w-full mt-4 md:mt-11 bg-green-500 text-white"
          type="submit"
        >
          {note ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
}

export default NoteEditorForm;
