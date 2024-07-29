import React from "react";

function Section({ children, className }) {
  return (
    <section className={`p-5 min-h-screen ${className}`}>{children}</section>
  );
}

export default Section;
