import api from "./api";

// handle teacher login
export const loginTeacher = (credentials) =>
  api.post("/teacher/login", credentials);

// get assigned class
export const getTeacherClasses = () => api.get("/teacher/classes");

// get profile details
export const getTeacherProfile = (id) => api.get(`/teacher/profile/${id}`);

// update profile
export const updateTeacherProfile = (id, teacherData) =>
  api.put(`/teacher/update-profile/${id}`, teacherData);
