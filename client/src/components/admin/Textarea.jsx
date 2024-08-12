import React, { forwardRef } from "react";

const Textarea = forwardRef(
  ({ children, placeholder, name, id, value, ...rest }, ref) => {
    return (
      <textarea
        placeholder={placeholder}
        name={name}
        ref={ref}
        id={id}
        value={value}
        {...rest}
        className="block w-full rounded-md border-0 py-2 pl-7 pr-20 text-gray-700 text-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
      >
        {children}
      </textarea>
    );
  }
);

export default Textarea;
