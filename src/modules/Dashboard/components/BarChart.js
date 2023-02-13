import React, { useState } from "react";
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const BarChart = ({ dataTime }) => {
  // eslint-disable-next-line
  const [data, setdata] = useState({
    labels: dataTime.map((d) => d.month),
    datasets: [
      {
        label: "Total orders",
        data: dataTime.map((d) => d.total),
        borderWidth: 1
      },
    ],
  });
  return <Bar data={data}></Bar>;
};

export default BarChart;
