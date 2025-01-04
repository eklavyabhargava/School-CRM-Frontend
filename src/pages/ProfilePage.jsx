import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, Panel } from "rsuite";
import api from "../services/api";

const ProfilePage = () => {
  const { user } = useSelector((state) => state.user);
  const [details, setDetails] = useState(null);

  useEffect(() => {
    if (user) {
      fetchProfileDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchProfileDetails = async () => {
    try {
      const endpoint =
        user.role === "student"
          ? `/students/${user.id}`
          : `/teachers/${user.id}`;
      const response = await api.get(endpoint);
      setDetails(response.data);
    } catch (error) {
      console.error("Error fetching profile details", error);
    }
  };

  if (!details) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-5">Profile</h2>

      <Panel bordered header="Personal Details" className="mb-5">
        <p>
          <strong>Name:</strong> {details.name}
        </p>
        <p>
          <strong>Gender:</strong> {details.gender}
        </p>
        <p>
          <strong>Date of Birth:</strong>{" "}
          {new Date(details.dob).toLocaleDateString()}
        </p>
        <p>
          <strong>Contact:</strong> {details.contactDetails}
        </p>
        {user.role === "teacher" && (
          <p>
            <strong>Salary:</strong> ${details.salary}
          </p>
        )}
        {user.role === "student" && (
          <p>
            <strong>Fees Paid:</strong> {details.feesPaid ? "Yes" : "No"}
          </p>
        )}
      </Panel>

      {user.role === "student" && details.class && (
        <Panel bordered header="Classroom Details" className="mb-5">
          <p>
            <strong>Class Name:</strong> {details.class.name}
          </p>
          <p>
            <strong>Year:</strong> {details.class.year}
          </p>
          <p>
            <strong>Teacher:</strong> {details.class.teacher.name}
          </p>
        </Panel>
      )}

      {user.role === "teacher" && details.assignedClass && (
        <Panel bordered header="Classroom Details" className="mb-5">
          <p>
            <strong>Class Name:</strong> {details.assignedClass.name}
          </p>
          <p>
            <strong>Year:</strong> {details.assignedClass.year}
          </p>
        </Panel>
      )}

      {user.role === "teacher" && details.students && (
        <div>
          <h3 className="text-xl font-bold mb-3">Students in Assigned Class</h3>
          <Table data={details.students} autoHeight>
            <Table.Column width={50} align="center">
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.Cell dataKey="id" />
            </Table.Column>
            <Table.Column width={200}>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.Cell dataKey="name" />
            </Table.Column>
            <Table.Column width={100}>
              <Table.HeaderCell>Gender</Table.HeaderCell>
              <Table.Cell dataKey="gender" />
            </Table.Column>
          </Table>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
