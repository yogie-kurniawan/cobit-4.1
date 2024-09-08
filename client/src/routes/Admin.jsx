import React from "react";
import { Route, Navigate } from "react-router-dom";
import {
  Login,
  Dashboard,
  Admin,
  CreateAdmin,
  EditAdmin,
  Question,
  CreateQuestion,
  EditQuestion,
  Domain,
  CreateDomain,
  EditDomain,
  Process,
  CreateProcess,
  EditProcess,
  User,
  CreateUser,
  EditUser,
  Answer,
  MaturityLevel,
  Gap,
  Report,
  PrintReport,
  NotFound,
} from "../pages/admin/index";
import PrivateRoute from "../middleware/PrivateRoute";
import PublicRoute from "../middleware/PublicRoute";
import { SidebarProvider } from "../context/admin/SidebarContext";
const AdminRoute = () => {
  return (
    <>
      <Route
        path="login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route index element={<Navigate to="dashboard" />} />
      <Route
        path="dashboard"
        element={
          <PrivateRoute requiredRole="admin">
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route path="admins" element={<Admin />} />
      <Route path="admins/create" element={<CreateAdmin />} />
      <Route path="admins/:id/edit" element={<EditAdmin />} />
      <Route path="users" element={<User />} />
      <Route path="users/create" element={<CreateUser />} />
      <Route path="users/:id/edit" element={<EditUser />} />
      <Route path="domains" element={<Domain />} />
      <Route path="domains/create" element={<CreateDomain />} />
      <Route path="domains/:id/edit" element={<EditDomain />} />
      <Route path="processes" element={<Process />} />
      <Route path="processes/create" element={<CreateProcess />} />
      <Route path="processes/:id/edit" element={<EditProcess />} />
      <Route path="questions" element={<Question />} />
      <Route path="questions/create" element={<CreateQuestion />} />
      <Route path="questions/:id/edit" element={<EditQuestion />} />
      <Route path="maturity-levels" element={<MaturityLevel />} />
      <Route path="gaps" element={<Gap />} />
      <Route path="report" element={<Report />} />
      <Route path="answers" element={<Answer />} />
      <Route path="*" exact element={<NotFound />} />
    </>
  );
};

export default AdminRoute;
