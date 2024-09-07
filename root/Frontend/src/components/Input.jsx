import React, {useId} from 'react'

const Input = React.forwardRef( function({
    label,
    labelClassName = "",
    type = "text",
    className = "",
    ...props
}, ref ){

    const id = useId()
    return (
        <div className='w-full'>
            { label && <label
            className={`inline-block mb-1 pl-1 ${labelClassName}`}
            htmlFor={id}
            id={id}>
                {label}
            </label> 
            }

            <input 
            type={type}
            className={`px-3 py-2 rounded-lg bg-zinc-600 text-white outline-none focus:bg-zinc-500 duration-200 border border-gray-400 w-full ${className}`}
            ref={ref}
            id={id}
            {...props}
            />

        </div>
    )
} )

export default Input