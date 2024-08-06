import React from "react";
import { Link } from "react-router-dom";

const LinkButton = (to, text, className, variant) => {
  return (
    <Link to={text} className={`px-4 py-2 text-medium ${varian}`}>
      {text}
    </Link>
  );
};

export default LinkButton;
