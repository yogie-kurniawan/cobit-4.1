import React from "react";
import { Link } from "react-router-dom";

const LinkButton = ({ to, bgColor, color, text, size, variant }) => {
  return (
    <Link
      to={to}
      style={{ backgroundColor: bgColor, color }}
      className={`bg-${variant} text-${color} text-sm rounded-[30px] px-4 py-2`}
    >
      {text}
    </Link>
  );
};

export default LinkButton;
