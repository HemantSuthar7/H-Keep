import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Select, RTE } from "./index";
import { createNote, updateNote } from "../methods/noteMethods";

function NoteEditorForm({ note }) {
  const { register, handleSubmit, setValue, formState: { errors }, control, getValues, watch } = useForm({
    defaultValues: {
        title: note?.title || "",
        textContent: note?.textContent || "",
        label: note?.label || "",
        color: note?.color || "",
        image: null,
    },
  });

  const [contentError, setContentError] = useState(false);
  const navigate = useNavigate();

  const submit = async (data) => {
    console.log("The data is:", data);

    if (!data.textContent || data.textContent.trim() === "") {
        setContentError(true);
        return;
    }

    setContentError(false);

    if (!data.title || data.title.trim() === "") {
        console.error("Title is required");
        return;
    }

    if (!data.color) {
        console.error("Color is required");
        return;
    }

    try {
        const finalData = new FormData();
        finalData.append('title', data.title.trim());
        finalData.append('textContent', data.textContent.trim());
        finalData.append('label', data.label);
        finalData.append('color', data.color);

        if (data.image && data.image[0]) {
            finalData.append('image', data.image[0]);
        }

        if (note) {
            const updatedNote = await updateNote(note._id, finalData);
            if (updatedNote) navigate(`/note/${updatedNote._id}`);
        } else {
            const newNote = await createNote(finalData);
            if (newNote) navigate(`/UserNotesAndLists`);
        }
    } catch (error) {
        console.error("Error submitting the note form:", error);
    }
  };

  useEffect(() => {
    if (note) {
      setValue("title", note.title);
      setValue("textContent", note.textContent);
      setValue("label", note.label);
      setValue("color", note.color);
    }
  }, [note, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap p-6 bg-gray-800 shadow-md rounded-lg max-w-3xl mx-auto text-white">
      <div className="w-full md:w-2/3 px-2">
        <div className="mb-4">
          <Input
            label="Title :"
            labelClassName="text-gray-300"
            placeholder="Title"
            className={`${errors.title ? 'border-red-500' : 'border-gray-600'} bg-gray-700 text-white`}
            {...register("title", { required: "Title is required" })}
            style={{ color: 'white', backgroundColor: '#2d2d2d' }}
          />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        </div>
        <div className="mb-4">
          {contentError && <p className="text-red-500">Content is required</p>}
          <RTE
            label="Content :"
            name="textContent"
            control={control}
            defaultValue={getValues("textContent")}
            onChange={() => setContentError(false)}
            className="bg-gray-700 text-white"
          />
        </div>
      </div>
      <div className="w-full md:w-1/3 px-2 mt-4 md:mt-0">
        <div className="mb-5">
          <Input
            label="Choose File"
            labelClassName="text-gray-300"
            type="file"
            className={`block w-full mb-5 text-sm text-gray-300 border ${errors.image ? 'border-red-500' : 'border-gray-600'} rounded-lg cursor-pointer bg-gray-700`}
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image")}
          />
          {errors.image && <p className="text-red-500">{errors.image.message}</p>}
        </div>
        {note?.image && (
          <div className="w-full mb-4">
            <img
              src={note.image}
              alt={note.title}
              className="rounded-lg"
            />
          </div>
        )}
        <div className="mb-4">
          <Select
            options={["Label 1", "Label 2", "Label 3"]}
            label="Project H-Keep"
            className={`bg-gray-700 text-white ${errors.label ? 'border-red-500' : 'border-gray-600'}`}
            {...register("label")}
          />
          {errors.label && <p className="text-red-500">{errors.label.message}</p>}
        </div>
        <div className="mb-4">
          <Select
            options={["#6C394F", "#692B17", "#256377"]}
            label="Color"
            className={`bg-gray-700 text-white ${errors.color ? 'border-red-500' : 'border-gray-600'}`}
            {...register("color", { required: "Color is required" })}
          />
          {errors.color && <p className="text-red-500">{errors.color.message}</p>}
        </div>
        {note && (
          <Button
            className="w-full mt-4 md:mt-11 bg-red-500 text-white"
            type="button"
            onClick={() => deleteNote(note._id)}
          >
            Delete
          </Button>
        )}
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
