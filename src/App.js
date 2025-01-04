import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Homepage";
import ClassManagementPage from "./pages/ClassManagement";
import ClassAnalyticsPage from "./pages/ClassAnalytics";
import FinancialAnalyticsPage from "./pages/FinancialAnalytics";
import AdminLogin from "./pages/admin/AdminLogin";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";
import StudentLogin from "./pages/student/StudentLogin";
import TeacherLogin from "./pages/teacher/TeacherLogin";
import AdminStudentsPage from "./pages/admin/Students";
import AdminTeachersPage from "./pages/admin/Teachers";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/teacher/login" element={<TeacherLogin />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["student", "teacher"]}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/classes"
          element={
            <ProtectedRoute allowedRoles={["student", "teacher"]}>
              <ClassManagementPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ClassManagementPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/students"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminStudentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/teachers"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminTeachersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/class-analytics/:id"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ClassAnalyticsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/financial-analytics"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <FinancialAnalyticsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
