import React from "react";

const Box = ({ children, className }) => {
  return (
    <div className={`p-8 shadow-md my-3 rounded-md bg-white ${className}`}>
      {children}
    </div>
  );
};

export default Box;
