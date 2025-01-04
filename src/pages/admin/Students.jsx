import React, { useEffect, useState } from "react";
import PaginatedTable from "../../components/PaginatedTable";
import { Button, Form, Modal, Radio, RadioGroup, SelectPicker } from "rsuite";
import {
  getStudents,
  updateStudent,
  deleteStudent,
  createStudent,
  getAllClasses,
} from "../../services/adminService";
import toast from "react-hot-toast";

const AdminStudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [formValue, setFormValue] = useState({
    name: "",
    gender: "",
    dob: "",
    email: "",
    contactDetails: "",
    feesPaid: "",
    class: "",
  });
  const [currentStudentId, setCurrentStudentId] = useState(null);

  useEffect(() => {
    fetchStudents();
    fetchClasses();
  }, []);

  const fetchStudents = async () => {
    const response = await getStudents();
    if (response.status === 200) {
      setStudents(response.data);
    } else {
      toast.error(response.data.error || "Something went wrong!");
    }
  };

  const fetchClasses = async () => {
    const response = await getAllClasses();
    if (response.status === 200) {
      setClasses(
        response.data.map((cls) => ({ label: cls.name, value: cls._id }))
      );
    }
  };

  const handleEdit = (student) => {
    setFormValue(student);
    setIsEditing(true);
    setCurrentStudentId(student._id);
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (isEditing) {
      setLoading(true);
      const response = await updateStudent(currentStudentId, formValue);
      setLoading(false);
      if (response.status === 200) {
        setStudents(
          students.map((t) => (t._id === currentStudentId ? response.data : t))
        );
        setShowModal(false);
      } else {
        toast.error("Cannot save student data.");
      }
    } else {
      setLoading(true);
      const response = await createStudent(formValue);
      setLoading(false);
      if (response.status === 201) {
        setStudents((curr) => [...curr, response.data]);
        setShowModal(false);
      } else {
        toast.error("Cannot save student data.");
      }
    }
  };

  const handleDelete = async (studentId) => {
    const response = await deleteStudent(studentId);
    if (response.status === 200) {
      setStudents(students.filter((t) => t._id !== studentId));
    } else {
      toast.error("Unable to delete student!");
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-5">Manage Students</h2>
      <Button
        onClick={() => {
          setShowModal(true);
          setIsEditing(false);
        }}
      >
        Add Student
      </Button>
      <PaginatedTable
        data={students}
        columns={[
          { label: "Name", dataKey: "name", width: 200 },
          { label: "Gender", dataKey: "gender", width: 100 },
          { label: "DOB", dataKey: "dob", width: 130 },
          { label: "Email", dataKey: "email", width: 250 },
          { label: "Contact", dataKey: "contactDetails", width: 200 },
          { label: "Fees Paid", dataKey: "feesPaid", width: 100 },
          {
            label: "Class",
            dataKey: "class",
            width: 100,
            cellRenderer: (rowData) => rowData.class?.name || "Unassigned",
          },
        ]}
        actions={{ edit: handleEdit, delete: handleDelete }}
      />
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header>
          <Modal.Title>
            {isEditing ? "Edit Student" : "Add Student"}
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
              <Form.ControlLabel>Class</Form.ControlLabel>
              <SelectPicker
                name="class"
                data={classes}
                searchable={false}
                placeholder="Select a Class"
                value={formValue.class}
                onChange={(value) =>
                  setFormValue((curr) => ({ ...curr, class: value }))
                }
                block
              />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Fees Paid</Form.ControlLabel>
              <Form.Control name="feesPaid" accepter={RadioGroup}>
                <Radio value={"true"}>Yes</Radio>
                <Radio value={"false"}>No</Radio>
              </Form.Control>
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

export default AdminStudentsPage;
