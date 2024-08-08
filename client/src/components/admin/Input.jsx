import React, { forwardRef } from "react";

const Input = forwardRef(
  ({ type = "text", placeholder, name, id, value, ...props }, ref) => {
    return (
      <input
        type={type}
        placeholder={placeholder}
        ref={ref}
        name={name}
        id={id}
        value={value}
        className="block w-full rounded-md border-0 py-2 pl-7 pr-20 text-gray-700 text-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
      />
    );
  }
);

export default Input;
