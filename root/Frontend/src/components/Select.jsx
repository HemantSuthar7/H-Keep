import React, { useId } from 'react';

function Select({
  options = [],
  label,
  classname = "",
  ...props
}, ref) {
  const id = useId();
  return (
    <div className='w-full'>
      {label && (
        <label htmlFor={id} className=''>
          {label}
        </label>
      )}
      <select 
        {...props} 
        id={id} 
        ref={ref} 
        className={`px-3 py-2 rounded-lg bg-neutral-800 text-white outline-none focus:neutral-800 duration-200 border border-gray-200 w-full ${classname}`}
      >
        { options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        )) }
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
