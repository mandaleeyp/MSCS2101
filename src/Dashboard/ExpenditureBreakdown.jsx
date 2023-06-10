import React from 'react'
import { Card } from 'antd'
import { Pie, Bar } from 'react-chartjs-2'
import 'chart.js/auto'

import styles from './Dashboard.module.css'

const ExpenditureBreakdown = ({ expenditures, familyMembers }) => {
  // Calculate total expenditure per category
  const totalExpenditurePerCategory = expenditures.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount
    return acc
  }, {})

  // Generate pie chart data
  const pieChartLabels = Object.keys(totalExpenditurePerCategory)
  const pieChartData = Object.values(totalExpenditurePerCategory)

  // Calculate total expenditure per person
  const totalExpenditurePerPerson = expenditures.reduce((acc, expense) => {
    acc[expense.spender] = (acc[expense.spender] || 0) + expense.amount
    return acc
  }, {})

  // Generate bar chart data
  const barChartLabels = Object.keys(totalExpenditurePerPerson)
  const barChartData = Object.values(totalExpenditurePerPerson)

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false
  }

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0
        }
      }
    }
  }

  return (
    <div>
      <div className={styles.title}>Expenditure by Category</div>
      <div className={styles.pieContainer}>
        <Pie data={{ labels: pieChartLabels, datasets: [{ data: pieChartData }] }} options={pieChartOptions} />
      </div>
      <div className={styles.title}>Expenditure per Person</div>
      <div className={styles.barContainer}>
        <Bar
          data={{ labels: barChartLabels, datasets: [{ data: barChartData }] }}
          options={barChartOptions}
        />
      </div>
    </div>
  )
}

export default ExpenditureBreakdown
