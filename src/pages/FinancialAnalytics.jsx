import React, { useEffect, useState } from "react";
import { Chart, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
import { Toggle, DatePicker, ButtonToolbar } from "rsuite";
import { getFinancialAnalytics } from "../services/adminService";
import toast from "react-hot-toast";

// Register all required components
Chart.register(...registerables);

const FinancialAnalyticsPage = () => {
  const [view, setView] = useState("yearly");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [analyticsData, setAnalyticsData] = useState({});

  const getAnalyticsData = async () => {
    const response = await getFinancialAnalytics(view, selectedDate);
    if (response.status === 200) {
      setAnalyticsData(response.data);
    } else {
      toast.error(response.data.error || "Something went wrong!");
    }
  };

  useEffect(() => {
    getAnalyticsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, selectedDate]);

  const handleToggle = () => {
    setView(view === "yearly" ? "monthly" : "yearly");
  };

  const chartData = {
    labels: ["Teacher Salaries", "Student Fees"],
    datasets: [
      {
        label: "Expenses vs Income",
        data: [
          analyticsData.teacherSalaries || 0,
          analyticsData.studentFees || 0,
        ],
        backgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-5">Financial Analytics</h2>
      <ButtonToolbar>
        <Toggle checked={view === "monthly"} onChange={handleToggle} />
        {view === "monthly" && (
          <DatePicker
            onChange={(value) => setSelectedDate(value)}
            format="YYYY-MM"
            placeholder="Select Month"
            style={{ marginLeft: "10px" }}
          />
        )}
      </ButtonToolbar>
      <Bar data={chartData} style={{ marginTop: "20px" }} />
    </div>
  );
};

export default FinancialAnalyticsPage;
