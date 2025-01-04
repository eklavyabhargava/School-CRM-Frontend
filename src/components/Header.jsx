// frontend/src/components/Header.jsx
import React from "react";
import { Navbar, Nav } from "rsuite";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ExitIcon from "@rsuite/icons/legacy/Exit";
import HomeIcon from "@rsuite/icons/legacy/Home";
import UserIcon from "@rsuite/icons/legacy/User";
import { logout } from "../services/authService";

const Header = () => {
  const { user } = useSelector((state) => state.user);

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
    window.location.reload();
  };

  return (
    <Navbar appearance="inverse" className="shadow-md">
      <Navbar.Brand
        as={Link}
        to="/"
        className="flex items-center font-semibold"
      >
        School Management System
      </Navbar.Brand>
      <Nav pullRight>
        {user ? (
          <>
            <Nav.Item as={Link} to="/profile" icon={<UserIcon />}>
              {user.name || "Profile"}
            </Nav.Item>
            <Nav.Item
              icon={<ExitIcon />}
              onClick={() => {
                handleLogout();
              }}
            >
              Logout
            </Nav.Item>
          </>
        ) : (
          <>
            <Nav.Item as={Link} to="/admin/login">
              Admin Login
            </Nav.Item>
            <Nav.Item as={Link} to="/teacher/login">
              Teacher Login
            </Nav.Item>
            <Nav.Item as={Link} to="/student/login">
              Student Login
            </Nav.Item>
          </>
        )}
      </Nav>
    </Navbar>
  );
};

export default Header;
