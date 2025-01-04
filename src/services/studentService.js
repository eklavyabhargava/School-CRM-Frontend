import api from "./api";

// handle student login
export const loginStudent = (credentials) =>
  api.post("/student/login", credentials);

// get assigned class
export const getAssignedClass = () => api.get("/student/classes");

// get profile details
export const getStudentProfile = (id) => api.get(`/student/profile/${id}`);

// update profile
export const updateStudentProfile = (id, studentData) =>
  api.put(`/student/update-profile/${id}`, studentData);
