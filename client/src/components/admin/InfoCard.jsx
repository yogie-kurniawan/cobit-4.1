import React from "react";

const InfoCard = ({ children, className }) => {
  return (
    <div className={`p-4 shadow-md my-3 rounded-md bg-white ${className}`}>
      {children}
    </div>
  );
};

export default InfoCard;
