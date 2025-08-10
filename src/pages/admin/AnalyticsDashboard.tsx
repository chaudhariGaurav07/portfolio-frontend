import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import api from "@/lib/api";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState([]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const { data } = await api.get("/analytics");
      setAnalytics(data.events || []);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    }
  };

  // Group event counts
  const grouped = analytics.reduce((acc: Record<string, number>, curr: any) => {
    acc[curr.event] = (acc[curr.event] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(grouped),
    datasets: [
      {
        label: "Event Count",
        data: Object.values(grouped),
        backgroundColor: "rgba(59, 130, 246, 0.7)",
        borderRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#1f2937",
        titleColor: "#fff",
        bodyColor: "#fff",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Analytics</h2>

        {analytics.length === 0 ? (
          <p className="text-gray-500 text-center">No analytics data available yet.</p>
        ) : (
          <Bar data={chartData} options={chartOptions} />
        )}
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
