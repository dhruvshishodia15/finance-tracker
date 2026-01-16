import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import { useExpense } from '../hooks/ExpenseContext';
import { useSidebar } from '../hooks/SidebarContext';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { categoryColors } from '../utils/mockData';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const Analytics = () => {
  const { expenses } = useExpense();
  const { isOpen } = useSidebar();

  // Prepare data for pie chart (category-wise expenses)
  const categoryData = expenses
    .filter(exp => exp.type === 'expense')
    .reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
      return acc;
    }, {});

  const pieData = {
    labels: Object.keys(categoryData),
    datasets: [{
      data: Object.values(categoryData),
      backgroundColor: Object.keys(categoryData).map(cat => categoryColors[cat] || '#6b7280'),
      borderColor: Object.keys(categoryData).map(cat => categoryColors[cat] || '#6b7280'),
      borderWidth: 2,
    }],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'white',
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
      },
    },
  };

  // Prepare data for bar chart (monthly income vs expense)
  const monthlyData = expenses.reduce((acc, exp) => {
    const month = new Date(exp.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    if (!acc[month]) {
      acc[month] = { income: 0, expense: 0 };
    }
    acc[month][exp.type] += exp.amount;
    return acc;
  }, {});

  const barData = {
    labels: Object.keys(monthlyData),
    datasets: [
      {
        label: 'Income',
        data: Object.values(monthlyData).map(month => month.income),
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 1,
      },
      {
        label: 'Expense',
        data: Object.values(monthlyData).map(month => month.expense),
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white',
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'white',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      y: {
        ticks: {
          color: 'white',
          callback: function(value) {
            return '₹' + value;
          },
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Navbar />
      <Sidebar />

      <div className={`pt-20 px-8 pb-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-0'}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
          <p className="text-gray-400">Visualize your financial data</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass p-6 rounded-lg"
          >
            <h2 className="text-xl font-bold text-white mb-4">Expenses by Category</h2>
            <div className="h-80">
              <Pie data={pieData} options={pieOptions} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass p-6 rounded-lg"
          >
            <h2 className="text-xl font-bold text-white mb-4">Monthly Income vs Expense</h2>
            <div className="h-80">
              <Bar data={barData} options={barOptions} />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 glass p-6 rounded-lg"
        >
          <h2 className="text-xl font-bold text-white mb-4">Summary Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-400">
                ₹{expenses.filter(e => e.type === 'income').reduce((acc, e) => acc + e.amount, 0).toFixed(2)}
              </p>
              <p className="text-gray-400">Total Income</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-400">
                ₹{expenses.filter(e => e.type === 'expense').reduce((acc, e) => acc + e.amount, 0).toFixed(2)}
              </p>
              <p className="text-gray-400">Total Expenses</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold gradient-text">
                {expenses.length}
              </p>
              <p className="text-gray-400">Total Transactions</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;