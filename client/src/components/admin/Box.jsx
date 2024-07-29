import React from "react";

const Box = ({ children, className }) => {
  return (
    <div className={`p-4 shadow-md my-3 rounded-md ${className}`}>
      {children}
    </div>
  );
};

export default Box;
