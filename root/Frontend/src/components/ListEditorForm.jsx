import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createList, updateList } from '../methods/todoListMethods';
import { Select } from "../components/index.js";
import { getCurrentUserData } from "../methods/userMethods.js";
import { FaArrowLeft } from 'react-icons/fa';


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
      color: listData?.color || '', // Default to empty string
      image: null,
      todoListId: listData?._id,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'todoItems',
  });

  const [labels, setLabels] = useState([]);
  const [imagePreview, setImagePreview] = useState(listData?.imageUrl || null);
  const navigate = useNavigate();

  const watchImage = watch('image');
  const watchColor = watch('color');

  // Fetch user data and labels
  useEffect(() => {
    const fetchLabelData = async () => {
      try {
        const userData = await getCurrentUserData();
        console.log("Fetched userData:", userData);
        
        if (userData?.data?.labels) {
          setLabels(userData.data.labels);
          console.log("Labels set:", userData.data.labels);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchLabelData();
  }, []);

  useEffect(() => {
    if (listData) {
      setValue("title", listData.title);
      setValue("label", listData.label);
      setValue("color", listData.color); // Automatically set color if it exists
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
      console.log("The data is:", data);
      const formData = new FormData();

      formData.append('title', data.title);
      
      // Find the selected label's ID and append it to the formData
      const selectedLabel = labels.find(label => label.labelName === data.label);
      if (selectedLabel) {
        formData.append('label', selectedLabel._id);
      }

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

  const handleBackClick = () => {
    navigate("/UserNotesAndLists");
  };

  return (
  <div className='p-4'>
    <form
  onSubmit={handleSubmit(onSubmit)}
  className="p-6 bg-[#232427] shadow-xl shadow-black rounded-lg max-w-3xl mx-auto text-white sm:p-4 md:p-6"
>

  <div className="flex justify-between items-center mb-4 w-full">
    <button className="mr-2" onClick={handleBackClick}>
      <FaArrowLeft className="text-white hover:text-gray-400 text-xl md:text-2xl" />
    </button>
  </div>
  
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
          className="max-h-40 md:max-h-60 rounded-md object-cover"
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
      label="Label :"
      options={labels.map(label => label.labelName)}
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
                "#4B443A", "#232427"]} 
      value={watchColor}
      {...register('color')}
    />
  </div>

  {/* Submit Button */}
  <div className="text-center">
    <button
      type="submit"
      className="bg-[#E1DABF] hover:bg-black text-black hover:text-white py-2 px-4 rounded shadow-md shadow-[#878375] border border-black duration-300"
      disabled={isSubmitting}
    >
      {listData ? 'Update' : 'Create'}
    </button>
  </div>
  </form>
  </div>

  );
};

export default ListEditorForm;
