import React from "react";
import Section from "../../components/admin/Section";

const NotFound = () => {
  return (
    <Section className="pt-24">
      <div className="text-center flex flex-col gap-3">
        <h1 className="text-gray-500 text-6xl font-bold">404</h1>
        <h1 className="text-gray-500 text-3xl font-bold">NOT FOUND</h1>
      </div>
    </Section>
  );
};

export default NotFound;
