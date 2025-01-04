import React, { useEffect, useState } from "react";
import PaginatedTable from "../../components/PaginatedTable";
import { Button, Form, Modal } from "rsuite";
import {
  getTeachers,
  updateTeacher,
  deleteTeacher,
  createTeacher,
} from "../../services/adminService";
import toast from "react-hot-toast";

const AdminTeachersPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [formValue, setFormValue] = useState({
    name: "",
    gender: "",
    dob: "",
    email: "",
    contactDetails: "",
    salary: "",
  });
  const [currentTeacherId, setCurrentTeacherId] = useState(null);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    const response = await getTeachers();
    if (response.status === 200) {
      setTeachers(response.data);
    } else {
      toast.error(response.data.error || "Something went wrong!");
    }
  };

  const handleEdit = (teacher) => {
    setFormValue(teacher);
    setIsEditing(true);
    setCurrentTeacherId(teacher._id);
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (isEditing) {
      setLoading(true);
      const response = await updateTeacher(currentTeacherId, formValue);
      setLoading(false);
      if (response.status === 200) {
        setTeachers(
          teachers.map((t) => (t._id === currentTeacherId ? response.data : t))
        );
        setShowModal(false);
      } else {
        toast.error("Cannot save teacher data.");
      }
    } else {
      setLoading(true);
      const response = await createTeacher(formValue);
      setLoading(false);
      if (response.status === 201) {
        setTeachers((curr) => [...curr, response.data]);
        setShowModal(false);
      } else {
        toast.error("Cannot save teacher data.");
      }
    }
  };

  const handleDelete = async (teacherId) => {
    const response = await deleteTeacher(teacherId);
    if (response.status === 200) {
      setTeachers(teachers.filter((t) => t._id !== teacherId));
    } else {
      toast.error("Unable to delete teacher!");
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-5">Manage Teachers</h2>
      <Button
        onClick={() => {
          setShowModal(true);
          setIsEditing(false);
        }}
      >
        Add Teacher
      </Button>
      <PaginatedTable
        data={teachers}
        columns={[
          { label: "Name", dataKey: "name", width: 200 },
          { label: "Gender", dataKey: "gender", width: 100 },
          { label: "DOB", dataKey: "dob", width: 150 },
          { label: "Email", dataKey: "email", width: 250 },
          { label: "Contact", dataKey: "contactDetails", width: 200 },
          { label: "Salary", dataKey: "salary", width: 150 },
        ]}
        actions={{ edit: handleEdit, delete: handleDelete }}
      />
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header>
          <Modal.Title>
            {isEditing ? "Edit Teacher" : "Add Teacher"}
          </Modal.Title>
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
              <Form.ControlLabel>Gender</Form.ControlLabel>
              <Form.Control name="gender" />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Email</Form.ControlLabel>
              <Form.Control name="email" />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Date of Birth</Form.ControlLabel>
              <Form.Control name="dob" type="date" />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Contact</Form.ControlLabel>
              <Form.Control name="contactDetails" />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Salary</Form.ControlLabel>
              <Form.Control name="salary" type="number" />
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

export default AdminTeachersPage;
