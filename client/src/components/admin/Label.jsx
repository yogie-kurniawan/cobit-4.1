import React from "react";

const Label = ({ label, forI }) => {
  return (
    <label
      htmlFor={forI}
      className="block text-sm font-medium leading-6 text-gray-700"
    >
      {label}
    </label>
  );
};

export default Label;
