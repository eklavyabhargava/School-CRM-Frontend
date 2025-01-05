import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../store/userSlice";
import LoginForm from "../../components/LoginForm";
import { loginStudent } from "../../services/studentService";
import toast from "react-hot-toast";

const StudentLogin = () => {
  const { user } = useSelector((state) => state.user);
  const [formValue, setFormValue] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/profile");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleLogin = async () => {
    setLoading(true);
    const response = await loginStudent(formValue);
    setLoading(false);
    if (response.status === 200) {
      dispatch(setUser(response.data.teacher));
      navigate("/profile");
    } else {
      toast.error(response.data.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold mb-5 text-center">Student Login</h2>
        <LoginForm
          formValue={formValue}
          setFormValue={setFormValue}
          loading={loading}
          handleLogin={handleLogin}
        />
      </div>
    </div>
  );
};

export default StudentLogin;
