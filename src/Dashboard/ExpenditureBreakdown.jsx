import React from 'react'
import { Pie, Bar } from 'react-chartjs-2'
import 'chart.js/auto'

import styles from './Dashboard.module.css'
import { EXPENSE_CATEGORIES } from '../constants'

const ExpenditureBreakdown = ({ expenditures }) => {
  // Calculate total expenditure per category
  const totalExpenditurePerCategory = expenditures.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + parseFloat(expense.amount)
    return acc
  }, {})

  // Generate pie chart data
  const pieChartLabels = Object.keys(totalExpenditurePerCategory)
  const pieChartData = Object.values(totalExpenditurePerCategory)

  // Calculate total expenditure per person
  const totalExpenditurePerPerson = expenditures.reduce((acc, expense) => {
    acc[expense.spender] = (acc[expense.spender] || 0) + parseFloat(expense.amount)
    return acc
  }, {})

  // Generate bar chart data
  const barChartLabels = Object.keys(totalExpenditurePerPerson)
  const barChartData = Object.values(totalExpenditurePerPerson)
  barChartData.sort((a, b) => b - a)

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: 'var(--background)',
          borderColor: 'transparent'
        }
      }
    }
  }

  const barChartOptions = {
    plugins: {
      legend: {
        display: false // Set to false to hide the legend
      }
    },
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: 'var(--background)'
        },
        grid: {
          drawBorder: false // Hide the x-axis grid lines
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          align: 'left',
          precision: 0,
          color: 'var(--background)'
        },
        grid: {
          display: false // Hide the y-axis grid lines
        }
      }
    }
  }

  return (
    <div>
      <div className={styles.title}>Expenditure by Category</div>
      <div className={styles.pieContainer}>
        <Pie
          data={{
            labels: pieChartLabels,
            datasets: [{
              data: pieChartData,
              backgroundColor: pieChartLabels.map((category) => EXPENSE_CATEGORIES[category]?.color),
              borderColor: 'var(--background)',
              borderWidth: 5

            }]
          }} options={pieChartOptions}
        />
      </div>
      <div className={styles.title}>Expenditure per Person</div>
      <div className={styles.barContainer}>
        <Bar
          data={{
            labels: barChartLabels,
            datasets: [{
              data: barChartData,
              borderColor: 'var(--background)',
              borderWidth: 5,
              backgroundColor: '#004643'
            }]
          }}
          options={barChartOptions}
        />
      </div>
    </div>
  )
}

export default ExpenditureBreakdown
