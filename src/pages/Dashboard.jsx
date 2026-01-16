import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useExpense } from '../hooks/ExpenseContext';
import { useSidebar } from '../hooks/SidebarContext';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import StatCard from '../components/StatCard';

const Dashboard = () => {
  const { totalBalance, monthlyIncome, monthlyExpense, savings } = useExpense();
  const { isOpen } = useSidebar();

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
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Welcome back! Here's your financial overview.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Balance"
            value={totalBalance.toFixed(2)}
            icon="💰"
            color="blue"
            prefix="₹"
          />
          <StatCard
            title="Monthly Income"
            value={monthlyIncome.toFixed(2)}
            icon="📈"
            color="green"
            prefix="₹"
          />
          <StatCard
            title="Monthly Expense"
            value={monthlyExpense.toFixed(2)}
            icon="📉"
            color="red"
            prefix="₹"
          />
          <StatCard
            title="Savings"
            value={savings.toFixed(2)}
            icon="🎯"
            color={savings >= 0 ? "green" : "red"}
            prefix="₹"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass p-6 rounded-lg"
        >
          <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
              <div className="text-2xl mb-2">➕</div>
              <h3 className="font-semibold text-white">Add Expense</h3>
              <p className="text-sm text-gray-400">Track your spending</p>
            </div>
            <div className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="font-semibold text-white">View Analytics</h3>
              <p className="text-sm text-gray-400">Analyze your finances</p>
            </div>
            <div className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="font-semibold text-white">Set Budget</h3>
              <p className="text-sm text-gray-400">Plan your expenses</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;