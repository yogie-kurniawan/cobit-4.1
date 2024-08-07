import React from "react";
import { Route, Navigate } from "react-router-dom";
import {
  Dashboard,
  Admin,
  CreateAdmin,
  Question,
  CreateQuestion,
  Domain,
  Process,
  User,
  Answer,
  NotFound,
} from "../pages/admin/index";

const AdminRoute = () => {
  return (
    <>
      <Route index element={<Navigate to="dashboard" />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="admins" element={<Admin />} />
      <Route path="admins/create" element={<CreateAdmin />} />
      <Route path="users" element={<User />} />
      <Route path="domains" element={<Domain />} />
      <Route path="processes" element={<Process />} />
      <Route path="questions" element={<Question />} />
      <Route path="questions/create" element={<CreateQuestion />} />
      <Route path="answers" element={<Answer />} />
      <Route path="*" exact element={<NotFound />} />
    </>
  );
};

export default AdminRoute;
