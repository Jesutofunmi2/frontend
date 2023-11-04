'use client'

import React from 'react'
import styles from './chart.module.css'

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js'
import { Doughnut, Bar } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend, LinearScale, BarElement, CategoryScale, Title)

// DOUGHNUT CHART
export const DoughnutChart = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js doughnut Chart',
      },
    },
  }

  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  return (
    <div className={styles.doughnutWrapper}>
      {/* <Doughnut options={options} data={data} /> */}
    </div>
  )
}

// BAR CHART
export function BarChart() {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  }

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

  const stats = ['30', '40', '20', '50', '200', '25', '97']

  const sta = ['38', '50', '90', '20', '100', '25', '88']

  const data = {
    labels,
    datasets: [
      {
        label: 'Male',
        data: stats.map((item) => item),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Female',
        data: sta.map((item) => item),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }
  // return <Bar options={options} data={data} />
}
