import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, DatePicker } from "rsuite";
import {
  createStudent,
  deleteStudent,
  getStudents,
  updateStudent,
} from "../services/adminService";

const StudentPage = () => {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formValue, setFormValue] = useState({
    name: "",
    gender: "",
    dob: "",
    contactDetails: "",
    feesPaid: false,
    class: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentStudentId, setCurrentStudentId] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await getStudents();
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching classes", error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (isEditing) {
        const response = await updateStudent(currentStudentId, formValue);
        if (!response.data.error) {
          setStudents((prevData) => {
            const updatedData = prevData.map((data) => {
              if (data._id === currentStudentId) {
                data = response.data;
              }
              return data;
            });
            return updatedData;
          });
        }
      } else {
        const response = await createStudent(formValue);
        if (!response.data.error) {
          setStudents((prev) => [...prev, response.data]);
        }
      }
      setShowModal(false);
    } catch (error) {
      console.error("Error saving class", error);
    }
  };

  const handleEdit = (classData) => {
    setFormValue(classData);
    setIsEditing(true);
    setCurrentStudentId(classData.id);
    setShowModal(true);
  };

  const handleDelete = async (student) => {
    try {
      const response = await deleteStudent(student._id);
      if (response.isSuccess) {
        setStudents((prev) => prev.filter((data) => data._id !== student._id));
      }
    } catch (error) {
      console.error("Error deleting class", error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-5">Students</h2>
      <Button
        onClick={() => {
          setShowModal(true);
          setIsEditing(false);
        }}
      >
        Add Student
      </Button>

      <Table data={students} autoHeight>
        <Table.Column width={200}>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.Cell dataKey="name" />
        </Table.Column>
        <Table.Column width={50}>
          <Table.HeaderCell>Gender</Table.HeaderCell>
          <Table.Cell dataKey="gender" />
        </Table.Column>
        <Table.Column width={100}>
          <Table.HeaderCell>Date of Birth</Table.HeaderCell>
          <Table.Cell dataKey="dob" />
        </Table.Column>
        <Table.Column width={100}>
          <Table.HeaderCell>Contact Details</Table.HeaderCell>
          <Table.Cell dataKey="contactDetails" />
        </Table.Column>
        <Table.Column width={100}>
          <Table.HeaderCell>Class</Table.HeaderCell>
          <Table.Cell dataKey="class" />
        </Table.Column>
        <Table.Column width={200}>
          <Table.HeaderCell>Actions</Table.HeaderCell>
          <Table.Cell>
            {(rowData) => (
              <span>
                <Button size="xs" onClick={() => handleEdit(rowData)}>
                  Edit
                </Button>
                <Button
                  size="xs"
                  color="red"
                  onClick={() => handleDelete(rowData.id)}
                >
                  Delete
                </Button>
              </span>
            )}
          </Table.Cell>
        </Table.Column>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
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
              <Form.ControlLabel>Date of Birth</Form.ControlLabel>
              <Form.Control name="dob" accepter={DatePicker} />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Contact Details</Form.ControlLabel>
              <Form.Control name="contactDetails" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit} appearance="primary">
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

export default StudentPage;
