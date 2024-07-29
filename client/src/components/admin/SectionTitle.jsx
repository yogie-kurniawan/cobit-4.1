import React from "react";

function SectionTitle({ title, subTitle }) {
  return (
    <div>
      <h1 className="text-gray-700 font-semibold text-2xl mb-1">{title}</h1>
      <span className="text-gray-500">{subTitle}</span>
    </div>
  );
}

export default SectionTitle;
