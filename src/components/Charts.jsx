import React from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const Chart = () => {
  // Mock data for charts
  const userData = [
    { name: "Admins", value: 5 },
    { name: "Editors", value: 10 },
    { name: "Viewers", value: 20 },
  ];

  const barData = [
    { name: "Week 1", Users: 20 },
    { name: "Week 2", Users: 25 },
    { name: "Week 3", Users: 15 },
    { name: "Week 4", Users: 30 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Pie Chart */}
      <div className="bg-white shadow-md p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-4">User Distribution</h2>
        <PieChart width={300} height={300}>
          <Pie
            data={userData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
          >
            {userData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </div>

      {/* Bar Chart */}
      <div className="bg-white shadow-md p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Weekly User Activity</h2>
        <BarChart width={400} height={300} data={barData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Users" fill="#82ca9d" />
        </BarChart>
      </div>
    </div>
  );
};

export default Chart;
