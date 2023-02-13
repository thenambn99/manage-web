import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({data}) => {
  const donutData = {
    labels: ["Cancelled", "Processing", "Completed"],
    datasets: [
      {
        label: "Num",
        data: [data.total_cancelled, data.total_processing, data.total_completed],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      }
    ]
  }
  return (
    <Doughnut data={donutData}></Doughnut>
  )
}

export default DonutChart
