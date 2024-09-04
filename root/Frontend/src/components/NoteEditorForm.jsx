import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Select, RTE } from "./index";
import { createNote, updateNote } from "../methods/noteMethods";

function NoteEditorForm({ noteData }) {
  const { register, handleSubmit, setValue, formState: { errors }, control, getValues, watch } = useForm({
    defaultValues: {
      title: noteData?.title || "",
      textContent: noteData?.textContent || "",
      label: noteData?.label || "",
      color: noteData?.color || "",
      image: null,
    },
  });

  const [imagePreview, setImagePreview] = useState(noteData?.imageUrl || null);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const watchImage = watch('image');
  const watchColor = watch('color');

  useEffect(() => {
    if (noteData) {
      setValue("title", noteData.title);
      setValue("textContent", noteData.textContent);
      setValue("label", noteData.label);
      setValue("color", noteData.color);
      setImagePreview(noteData.imageUrl || null);
    }

    if (selectedImage) {
      setImagePreview(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage, noteData, setValue]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const submit = async (data) => {
    if (!data.textContent.trim()) {
      console.error("Content is required");
      return;
    }

    if (!data.title.trim()) {
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

      if (selectedImage) {
        finalData.append('image', selectedImage);
      } else if (noteData?.imageUrl && !data.image) {
        const response = await fetch(noteData.imageUrl);
        const blob = await response.blob();
        finalData.append('image', blob, 'existing-image.jpg');
      }

      if (noteData) {
        finalData.append('noteId', noteData.id); 
        const updatedNote = await updateNote(finalData);
        if (updatedNote) navigate(`/UserNotesAndLists`);
      } else {
        const newNote = await createNote(finalData);
        if (newNote) navigate(`/UserNotesAndLists`);
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

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
          <RTE
            label="Content :"
            name="textContent"
            control={control}
            defaultValue={getValues("textContent")}
            className="bg-gray-700 text-white"
          />
          {!getValues("textContent") && <p className="text-red-500">Content is required</p>}
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
            onChange={handleImageChange} // Handle image change
          />
          {errors.image && <p className="text-red-500">{errors.image.message}</p>}
        </div>
        {imagePreview && (
          <div className="w-full mb-4">
            <img
              src={imagePreview}
              alt="Preview"
              className="rounded-lg"
            />
          </div>
        )}
        <div className="mb-4">
          <Select
            label="Project H-Keep"
            options={["Label 1", "Label 2", "Label 3"]}
            className={`bg-gray-700 text-white ${errors.label ? 'border-red-500' : 'border-gray-600'}`}
            {...register("label")}
          />
          {errors.label && <p className="text-red-500">{errors.label.message}</p>}
        </div>
        <div className="mb-4">
          <Select
            label="Color"
            options={["#F5D3B0", "#256377", "#0C625D", "#264D3B", "#77172E", 
                      "#284255", "#472E5B", "#6C394F", "#692B17", "#7C4A03", 
                      "#4B443A", "#232427"]}
            className={`bg-gray-700 text-white ${errors.color ? 'border-red-500' : 'border-gray-600'}`}
            {...register("color")}
          />
          {errors.color && <p className="text-red-500">{errors.color.message}</p>}
        </div>
      </div>
      <div className="w-full flex justify-end mt-4">
        <Button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          {noteData ? "Update Note" : "Create Note"}
        </Button>
      </div>
    </form>
  );
}

export default NoteEditorForm;
