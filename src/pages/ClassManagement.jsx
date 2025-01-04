import React, { useEffect, useState } from "react";
import PaginatedTable from "../components/PaginatedTable";
import { useNavigate } from "react-router-dom";
import { Button, Form, Modal, SelectPicker } from "rsuite";
import { useSelector } from "react-redux";
import {
  createClass,
  deleteClass,
  getAllClasses,
  getTeachers,
  updateClass,
} from "../services/adminService";
import toast from "react-hot-toast";

const ClassManagementPage = () => {
  const { user } = useSelector((state) => state.user);
  const [classes, setClasses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [formValue, setFormValue] = useState({
    name: "",
    year: "",
    teacher: "",
    studentFees: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentClassId, setCurrentClassId] = useState(null);

  useEffect(() => {
    fetchClasses();
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    const response = await getTeachers();
    if (response.status === 200) {
      const unassignedTeachers = response.data.filter(
        (teacher) => !teacher.assignedClass
      );
      setTeachers(
        unassignedTeachers.map((t) => ({ label: t.name, value: t._id }))
      );
    }
  };

  const fetchClasses = async () => {
    setLoading(true);
    const response = await getAllClasses();
    setLoading(false);
    if (response.status === 200) {
      setClasses(response.data);
    } else {
      toast.error(response.data.error || "Something went wrong!");
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (isEditing) {
      const response = await updateClass(currentClassId, {
        ...formValue,
        teacher: formValue.teacher._id,
      });
      const data = response.data;
      if (data.isSuccess) {
        setClasses((curr) => {
          const updatedClasses = curr.map((cls) => {
            if (cls._id === currentClassId) {
              cls = data;
            }
            return cls;
          });

          return updatedClasses;
        });
      }
    } else {
      const response = await createClass(formValue);
      const data = response.data;
      if (data.isSuccess) {
        setClasses([...classes, data]);
      }
    }
    setLoading(false);
    setShowModal(false);
  };

  const handleEdit = (classData) => {
    setFormValue(classData);
    setIsEditing(true);
    setCurrentClassId(classData._id);
    setShowModal(true);
  };

  const handleDelete = async (classData) => {
    const response = await deleteClass(classData._id);
    if (response.status === 200) {
      setClasses((curr) => curr.filter((cls) => cls._id !== classData._id));
    } else {
      toast.error("Unable to delete class!");
    }
  };

  const navigate = useNavigate();

  const columns = [
    { label: "Name", dataKey: "name", width: 200 },
    { label: "Year", dataKey: "year", width: 100 },
    {
      label: "Teacher",
      dataKey: "teacher",
      width: 150,
      cellRenderer: (rowData) => rowData.teacher?.name || "Unassigned", // Ensure teacher is a string
    },
    { label: "Student Fees", dataKey: "studentFees", width: 130 },
    {
      label: "Action",
      width: 150,
      align: "center",
      cellRenderer: (rowData) => (
        <button onClick={() => navigate(`/class-analytics/${rowData.id}`)}>
          View Analytics
        </button>
      ),
    },
  ];

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-5">Class Management</h2>
      <Button
        onClick={() => {
          setShowModal(true);
          setIsEditing(false);
        }}
      >
        Add Class
      </Button>
      <PaginatedTable
        data={classes}
        columns={columns}
        actions={
          user?.role === "admin"
            ? { edit: handleEdit, delete: handleDelete }
            : null
        }
      />
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header>
          <Modal.Title>{isEditing ? "Edit Class" : "Add Class"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            fluid
            onChange={(value) => setFormValue(value)}
            formValue={formValue}
          >
            <Form.Group>
              <Form.ControlLabel>Name</Form.ControlLabel>
              <Form.Control name="name" />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Year</Form.ControlLabel>
              <Form.Control name="year" type="number" />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Teacher</Form.ControlLabel>
              <SelectPicker
                name="teacher"
                data={teachers}
                searchable={false}
                placeholder="Select a Teacher"
                block
                value={formValue.teacher}
                onChange={(value) =>
                  setFormValue((prev) => ({ ...prev, teacher: value }))
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Student Fees</Form.ControlLabel>
              <Form.Control name="studentFees" type="number" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            loading={isLoading}
            onClick={handleSubmit}
            appearance="primary"
          >
            Save
          </Button>
          <Button onClick={() => setShowModal(false)} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ClassManagementPage;
