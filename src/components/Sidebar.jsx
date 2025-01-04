// frontend/src/components/Sidebar.jsx
import React, { useEffect, useState } from "react";
import { Nav, Sidenav } from "rsuite";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import DashboardIcon from "@rsuite/icons/legacy/Dashboard";
import GroupIcon from "@rsuite/icons/legacy/Group";
import ExitIcon from "@rsuite/icons/legacy/Exit";
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { logout } from "../services/authService";
import Icon from "@rsuite/icons/esm/Icon";

const Sidebar = () => {
  const { user } = useSelector((state) => state.user);
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const [navItemsToShow, setNavItems] = useState([]);

  useEffect(() => {
    if (user) {
      setNavItems(navItems[user.role]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
    window.location.reload();
  };

  const navItems = {
    admin: [
      { path: "/admin", label: "Manage Classes", icon: <DashboardIcon /> },
      {
        path: "/admin/financial-analytics",
        label: "Financial Analytics",
        icon: <GroupIcon />,
      },
      {
        path: "/admin/teachers",
        label: "Teachers",
        icon: <Icon as={FaChalkboardTeacher} />,
      },
      {
        path: "/admin/students",
        label: "Students",
        icon: <Icon as={PiStudentBold} />,
      },
    ],
    student: [
      { path: "/profile", label: "Profile", icon: <DashboardIcon /> },
      { path: "/classes", label: "My Classes", icon: <GroupIcon /> },
    ],
    teacher: [
      { path: "/profile", label: "Profile", icon: <DashboardIcon /> },
      { path: "/classes", label: "Assigned Classes", icon: <GroupIcon /> },
    ],
  };

  return (
    <div
      style={{
        width: expanded ? 260 : 56,
        height: "100vh",
        position: "fixed",
        zIndex: "999999",
      }}
    >
      <Sidenav
        expanded={expanded}
        defaultOpenKeys={["3"]}
        style={{ height: "100%" }}
      >
        <Sidenav.Body>
          <Nav>
            {user &&
              navItemsToShow?.map((item, index) => (
                <Nav.Item key={index} as={Link} to={item.path} icon={item.icon}>
                  {expanded && item.label}
                </Nav.Item>
              ))}
            <Nav.Item icon={<ExitIcon />} onClick={handleLogout}>
              {expanded && "Logout"}
            </Nav.Item>
          </Nav>
        </Sidenav.Body>

        <Sidenav.Toggle onToggle={() => setExpanded((curr) => !curr)} />
      </Sidenav>
    </div>
  );
};

export default Sidebar;
