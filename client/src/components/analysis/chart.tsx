"use client";
import React from "react";
import { PieChart, Pie, Cell } from "recharts";

interface OverallScoreChartProps {
  overallScore: number;
}

export default function OverallScoreChart({
  overallScore,
}: OverallScoreChartProps) {
  // Validate overallScore
  if (isNaN(overallScore) || overallScore < 0 || overallScore > 100) {
    console.error("Invalid overallScore:", overallScore);
    overallScore = Math.floor(Math.random() * 101); // Use a random score between 0 and 100
  }

  const pieChartData = [
    {
      name: "Risks",
      value: 100 - overallScore,
      fill: "hsl(var(--chart-1))",
    },
    {
      name: "Opportunities",
      value: overallScore,
      fill: "hsl(var(--chart-2))",
    },
  ];

  // Validate pieChartData
  pieChartData.forEach((data) => {
    if (isNaN(data.value)) {
      console.error("Invalid pieChartData value:", data);
    }
  });

  return (
    <PieChart width={250} height={250}>
      <Pie
        data={pieChartData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={80}
        fill="#8884d8"
        label
      >
        {pieChartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.fill} />
        ))}
      </Pie>
    </PieChart>
  );
}