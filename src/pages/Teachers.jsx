import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, DatePicker } from "rsuite";
import {
  createTeacher,
  deleteTeacher,
  getTeachers,
  updateTeacher,
} from "../services/adminService";
import toast from "react-hot-toast";

const TeacherPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formValue, setFormValue] = useState({
    name: "",
    gender: "",
    dob: "",
    contactDetails: "",
    salary: false,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentTeacherId, setCurrentTeacherId] = useState(null);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await getTeachers();
      setTeachers(response.data);
    } catch (error) {
      console.error("Error fetching classes", error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (isEditing) {
        const response = await updateTeacher(currentTeacherId, formValue);
        if (!response.data.error) {
          setTeachers((prevData) => {
            const updatedData = prevData.map((data) => {
              if (data._id === currentTeacherId) {
                data = response.data;
              }
              return data;
            });
            return updatedData;
          });
        }
      } else {
        const response = await createTeacher(formValue);
        if (!response.data.error) {
          setTeachers((prevData) => [...prevData, response.data]);
        }
      }
      setShowModal(false);
    } catch (error) {
      console.error("Error saving class", error);
    }
  };

  const handleEdit = (teacher) => {
    setFormValue(teacher);
    setIsEditing(true);
    setCurrentTeacherId(teacher._id);
    setShowModal(true);
  };

  const handleDelete = async (teacher) => {
    const response = await deleteTeacher(teacher._id);
    if (response.data.isSuccess) {
      setTeachers((curr) => curr.filter((t) => t._id !== teacher._id));
    } else {
      toast.error(response.data.error || "Unable to delete teacher");
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-5">Classes</h2>
      <Button
        onClick={() => {
          setShowModal(true);
          setIsEditing(false);
        }}
      >
        Add Class
      </Button>

      <Table data={teachers} autoHeight>
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
          <Table.HeaderCell>Salary</Table.HeaderCell>
          <Table.Cell dataKey="salary" />
        </Table.Column>
        <Table.Column width={100}>
          <Table.HeaderCell>Assigned Class</Table.HeaderCell>
          <Table.Cell dataKey="asssignedClass" />
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
              <Form.ControlLabel>Date of Birth</Form.ControlLabel>
              <Form.Control name="dob" accepter={DatePicker} />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Contact Details</Form.ControlLabel>
              <Form.Control name="contactDetails" />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Salary</Form.ControlLabel>
              <Form.Control name="salary" />
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

export default TeacherPage;
