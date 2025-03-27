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
  const quantities = Object.values(categoryQuantities);

  const backgroundColors = labels.map(() => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgba(${r}, ${g}, ${b}, 0.5)`;
  });
  const data = {
    labels,
    datasets: [
      {
        label: 'Total Stock Quantity per Category',
        data: quantities,
        backgroundColor: backgroundColors,
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