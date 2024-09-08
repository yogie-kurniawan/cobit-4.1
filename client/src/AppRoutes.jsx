import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/Main/MainLayout";
import AdminLayout from "./layouts/Admin/Layout";
import MainRoute from "./routes/Main";
import AdminRoute from "./routes/Admin";
import { SidebarProvider } from "./context/admin/SidebarContext";
import { AuthProvider } from "./hooks/useAuth";
import {
  Login,
  PrintQuestion,
  PrintProcess,
  PrintDomain,
  PrintAnswer,
  PrintReport,
} from "./pages/admin/index";
const AppRoutes = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Main Layout Routes */}
          <Route path="/" element={<MainLayout />}>
            {MainRoute()}
          </Route>

          {/* Admin Layout Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/domains/print" element={<PrintDomain />} />
          <Route path="/admin/processes/print" element={<PrintProcess />} />
          <Route path="/admin/questions/print" element={<PrintQuestion />} />
          <Route path="/admin/answers/print" element={<PrintAnswer />} />
          <Route path="/admin/report/print" element={<PrintReport />} />
          <Route
            path="/admin"
            element={
              <SidebarProvider>
                <AdminLayout />
              </SidebarProvider>
            }
          >
            {AdminRoute()}
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default AppRoutes;
