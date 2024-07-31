import React from "react";

const Button = ({ bgColor, color, text, size }) => {
  return (
    <button
      type="button"
      style={{ backgroundColor: bgColor, color }}
      className={`text-${size} rounded-full`}
    >
      {text}
    </button>
  );
};

export default Button;
