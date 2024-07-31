import React from "react";
import { Route, Navigate } from "react-router-dom";
import { Dashboard, Responden, Question, NotFound } from "../pages/admin/index";

const Admin = () => {
  return (
    <>
      <Route index element={<Navigate to="dashboard" />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="questions" element={<Question />} />
      <Route path="questions/add" element={<Question />} />
      <Route path="users" element={<Responden />} />
      <Route path="*" exact element={<NotFound />} />
    </>
  );
};

export default Admin;
