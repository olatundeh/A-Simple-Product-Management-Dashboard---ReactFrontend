// ProductGraph.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ProductGraph({ products }) {
  const categoryQuantities = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + product.quantity;
    return acc;
  }, {});

  const labels = Object.keys(categoryQuantities);
  const data = {
    labels,
    datasets: [
      {
        label: 'Total Stock Quantity per Category',
        data: Object.values(categoryQuantities),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Total Stock Quantity per Category',
      },
    },
  };

  return <Bar options={options} data={data} />;
}