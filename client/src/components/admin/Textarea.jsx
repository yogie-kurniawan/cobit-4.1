import React from "react";

const Texarea = ({ placeholder, text, name, id, value, ref }) => {
  return (
    <Texarea
      placeholder={placeholder}
      name={name}
      ref={ref}
      id={id}
      value={value}
      className="block w-full h-16 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
    >
      {text}
    </Texarea>
  );
};

export default Texarea;
