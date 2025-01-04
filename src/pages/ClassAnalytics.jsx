import React, { useEffect, useState } from "react";
import { Chart } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import { getClassAnalytics } from "../services/adminService";
import toast from "react-hot-toast";

const ClassAnalyticsPage = () => {
  const { id } = useParams();
  const [classData, setClassData] = useState(null);

  const getAnalyticsData = async () => {
    try {
      const response = await getClassAnalytics(id);
      if (response.status === 200) {
        setClassData(response.data);
      } else {
        toast.error(response.data.error || "Something went wrong!");
      }
    } catch (error) {
      toast.error("Failed to fetch class analytics");
    }
  };

  useEffect(() => {
    getAnalyticsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!classData) {
    return <div className="text-center py-10">Loading class analytics...</div>;
  }

  const genderCounts = classData.students.reduce(
    (acc, student) => {
      acc[student.gender] = (acc[student.gender] || 0) + 1;
      return acc;
    },
    { Male: 0, Female: 0, Other: 0 }
  );

  const chartData = {
    labels: ["Male", "Female", "Other"],
    datasets: [
      {
        label: "Gender Distribution",
        data: [genderCounts.Male, genderCounts.Female, genderCounts.Other],
        backgroundColor: ["#36A2EB", "#FF6384", "#e5a8ed"],
      },
    ],
  };

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-5">
        Class Analytics: {classData.name}
      </h2>
      <p>
        <strong>Year:</strong> {classData.year}
      </p>
      <p>
        <strong>Teacher:</strong> {classData.teacher.name}
      </p>
      <h3 className="text-xl font-semibold mt-5">Students</h3>
      <ul className="list-disc ml-6">
        {classData.students.map((student) => (
          <li key={student._id}>
            {student.name} - {student.gender}
          </li>
        ))}
      </ul>
      <div className="mt-5">
        <Chart type="pie" data={chartData} />
      </div>
    </div>
  );
};

export default ClassAnalyticsPage;
