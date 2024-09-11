import React, { useId } from 'react';

function Select({
  options = [],
  label,
  isColorSelect = false,  // New prop to check if it's for color selection
  className = "",
  ...props
}, ref) {
  const id = useId();

  // Function to determine text color based on background brightness for better readability
  const getTextColor = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 125 ? 'black' : 'white';
  };

  return (
    <div className='w-full'>
      {label && (
        <label htmlFor={id}>
          {label}
        </label>
      )}
      <select 
        {...props} 
        id={id} 
        ref={ref} 
        className={`px-3 py-2 rounded-lg bg-neutral-800 text-white outline-none focus:neutral-800 duration-200 border border-gray-200 w-full ${className}`}
      >
        {options?.map((option) => (
          <option 
            key={option} 
            value={option}
            // Conditionally apply background and text color for color selection
            style={isColorSelect ? {
              backgroundColor: option,
              color: getTextColor(option),
            } : {}}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
