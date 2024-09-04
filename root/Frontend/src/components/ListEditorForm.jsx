import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createList, updateList } from '../methods/todoListMethods';
import { Select } from "../components/index.js";

const ListEditorForm = ({ listData }) => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: listData?.title || '',
      todoItems: listData?.todoItems || [{ value: '', status: false }],
      label: listData?.label || '',
      color: listData?.color || '',  // Default to empty string
      image: null,
      todoListId: listData?._id,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'todoItems',
  });

  const [imagePreview, setImagePreview] = useState(listData?.imageUrl || null);
  const navigate = useNavigate();

  const watchImage = watch('image');
  const watchColor = watch('color');

  useEffect(() => {
    if (listData) {
      setValue("title", listData.title);
      setValue("label", listData.label);
      setValue("color", listData.color);  // Automatically set color if it exists
      setValue("todoItems", listData.todoItems);
      setValue("todoListId", listData._id);
    }

    if (watchImage && watchImage.length > 0) {
      const file = watchImage[0];
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(listData?.imageUrl || null);
    }
  }, [watchImage, listData, setValue]);

  const onSubmit = async (data) => {
    try {
        console.log("The data is : ", data);
        const formData = new FormData();

        formData.append('title', data.title);
        if (data.label) formData.append('label', data.label);
        formData.append('color', data.color);

        // Conditionally append the todoListId only if updating (listData exists)
        if (listData?._id) {
            formData.append('todoListId', listData._id);
        }

        data.todoItems.forEach((item, index) => {
            const todoItem = {
                value: item.value || '',
                status: item.status || false,
            };
            formData.append('todoItems', JSON.stringify(todoItem));
        });

        // Append the image if a new one is selected or the existing one from props
        if (data.image && data.image[0]) {
            formData.append('image', data.image[0]);
        } else if (listData?.imageUrl && !data.image) {
            const response = await fetch(listData.imageUrl);
            const blob = await response.blob();
            formData.append('image', blob, 'existing-image.jpg');
        }

        if (listData) {
            await updateList(formData);
            navigate("/List", { state: { listData } });
        } else {
            await createList(formData);
            navigate(`/UserNotesAndLists`);
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('An error occurred while submitting the form.');
    }
};



  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 bg-gray-800 shadow-md rounded-lg max-w-3xl mx-auto text-white"
    >
      {/* Title Field */}
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-300 font-medium mb-2">
          Title:
        </label>
        <input
          id="title"
          type="text"
          placeholder="Enter list title"
          {...register('title', { required: 'Title is required' })}
          className={`w-full p-2 border ${errors.title ? 'border-red-500' : 'border-gray-600'} rounded-md bg-gray-700 text-white`}
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
      </div>

      {/* Image Upload */}
      <div className="mb-4">
        <label htmlFor="image" className="block text-gray-300 font-medium mb-2">
          Image (optional):
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          {...register('image')}
          className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
        />
        {imagePreview && (
          <div className="mt-4">
            <img
              src={imagePreview}
              alt="Preview"
              className="max-h-60 rounded-md"
            />
          </div>
        )}
      </div>

      {/* Todo Items */}
      <div className="mb-6">
        <label className="block text-gray-300 font-medium mb-2">Todo Items:</label>
        {fields.map((item, index) => (
          <div key={item.id} className="flex items-center mb-2 space-x-2">
            <input
              type="text"
              placeholder="Enter todo item"
              {...register(`todoItems.${index}.value`, {
                required: 'Todo item is required',
                maxLength: {
                  value: 200,
                  message: 'Maximum length is 200 characters',
                },
              })}
              className={`flex-grow p-2 border ${errors.todoItems?.[index]?.value ? 'border-red-500' : 'border-gray-600'} rounded-md bg-gray-700 text-white`}
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        ))}
        {errors.todoItems && <p className="text-red-500 text-sm mt-1">{errors.todoItems.message}</p>}
        <button
          type="button"
          onClick={() => append({ value: '', status: false })}
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
        >
          Add Todo Item
        </button>
      </div>

      {/* Label Selection */}
      <div className="mb-4">
        <Select
          label="Label (optional):"
          options={['Work', 'Personal', 'Urgent']}
          className="bg-gray-700 text-white"
          {...register('label')}
        />
      </div>

      {/* Color Selection */}
      <div className="mb-4">
      <Select
          label="Color:"
          options={["#F5D3B0", "#256377", "#0C625D", "#264D3B", "#77172E", 
                    "#284255", "#472E5B", "#6C394F", "#692B17", "#7C4A03", 
                    "#4B443A", "#232427"]} // Color options provided
          value={watchColor}  // Bind the value to the color field
          {...register('color')}  // Register the color field with React Hook Form
        />
      </div>

      {/* Submit Button */}
      <div className="text-right">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          disabled={isSubmitting}
        >
          {listData ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
};

export default ListEditorForm;




/* sample successfull response from createList method : {
  "statusCode": 200,
  "data": {
      "data": {
          "title": "third list",
          "todoItems": [
              {
                  "value": "Task 1",
                  "status": false,
                  "_id": "66d6fec029aee76b4f4d6ce2"
              },
              {
                  "value": "Task 2",
                  "status": true,
                  "_id": "66d6fec029aee76b4f4d6ce3"
              }
          ],
          "createdBy": "66b0ec81a815f84bc1aaa913",
          "color": "#77172E",
          "labelCategory": null,
          "imageUrl": null,
          "_id": "66d6fec029aee76b4f4d6ce1",
          "createdAt": "2024-09-03T12:19:12.429Z",
          "updatedAt": "2024-09-03T12:19:12.429Z",
          "__v": 0
      }
  },
  "message": "List created successfully",
  "success": true
} */