import React from "react";

const Select = ({ children, name, id, ref }) => {
  return (
    <select
      name={name}
      id={id}
      ref={ref}
      className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
    >
      {children}
    </select>
  );
};

export default Select;
