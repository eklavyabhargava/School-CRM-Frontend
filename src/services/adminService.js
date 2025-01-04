import api from "./api";

// handle admin login
export const loginAdmin = (credentials) =>
  api.post("/admin/login", credentials);

// get class list
export const getAllClasses = () => api.get("/admin/classes");

// create new class
export const createClass = (classData) => api.post("/admin/classes", classData);

// update class data
export const updateClass = (id, classData) =>
  api.put(`/admin/classes/${id}`, classData);

// delete particular class
export const deleteClass = (id) => api.delete(`/admin/classes/${id}`);

// get students list
export const getStudents = () => api.get("/admin/students");

// create student
export const createStudent = (studentData) =>
  api.post("/admin/students", studentData);

// update student data
export const updateStudent = (id, studentData) =>
  api.put(`/admin/students/${id}`, studentData);

// delete student
export const deleteStudent = (id) => api.delete(`/admin/students/${id}`);

// get teachers list
export const getTeachers = () => api.get("/admin/teachers");

// create new teacher
export const createTeacher = (teacherData) =>
  api.post("/admin/teachers", teacherData);

// update teacher data
export const updateTeacher = (id, teacherData) =>
  api.put(`/admin/teachers/${id}`, teacherData);

// remove teacher
export const deleteTeacher = (id) => api.delete(`/admin/teachers/${id}`);

// get class analytics data
export const getClassAnalytics = (id) =>
  api.get(`/admin/class-analytics/${id}`);

// get financial analytics data
export const getFinancialAnalytics = (view, date) =>
  api.get(`/admin/financial-analytics?view=${view}&date=${date}`);
