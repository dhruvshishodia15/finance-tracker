import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useExpense } from '../hooks/ExpenseContext';
import { useSidebar } from '../hooks/SidebarContext';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Input from '../components/Input';

const Budget = () => {
  const { budget, setBudget, monthlyExpense } = useExpense();
  const { isOpen } = useSidebar();
  const [newBudget, setNewBudget] = useState(budget.toString());

  const handleSetBudget = () => {
    setBudget(parseFloat(newBudget));
  };

  const budgetUsage = (monthlyExpense / budget) * 100;
  const isOverBudget = budgetUsage > 100;

  const getProgressColor = () => {
    if (budgetUsage < 50) return 'bg-green-500';
    if (budgetUsage < 80) return 'bg-yellow-500';
    if (budgetUsage < 100) return 'bg-orange-500';
    return 'bg-red-500';
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
          <h1 className="text-3xl font-bold text-white mb-2">Budget</h1>
          <p className="text-gray-400">Set and monitor your monthly spending limits</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass p-6 rounded-lg"
          >
            <h2 className="text-xl font-bold text-white mb-6">Set Monthly Budget</h2>

            <div className="space-y-4">
              <Input
                label="Budget Amount"
                type="number"
                step="0.01"
                value={newBudget}
                onChange={(e) => setNewBudget(e.target.value)}
                placeholder="Enter your monthly budget"
                prefix="₹"
              />

              <Button onClick={handleSetBudget} className="w-full">
                Update Budget
              </Button>
            </div>

            <div className="mt-6 p-4 bg-white/5 rounded-lg">
              <p className="text-sm text-gray-400">Current Budget</p>
              <p className="text-2xl font-bold text-white">₹{budget.toFixed(2)}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass p-6 rounded-lg"
          >
            <h2 className="text-xl font-bold text-white mb-6">Budget Progress</h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Spent</span>
                <span className="text-white font-semibold">₹{monthlyExpense.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-400">Budget</span>
                <span className="text-white font-semibold">₹{budget.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-400">Remaining</span>
                <span className={`font-semibold ${isOverBudget ? 'text-red-400' : 'text-green-400'}`}>
                  ₹{(budget - monthlyExpense).toFixed(2)}
                </span>
              </div>

              <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(budgetUsage, 100)}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`h-full ${getProgressColor()} rounded-full`}
                />
              </div>

              <div className="text-center">
                <span className={`text-sm font-medium ${isOverBudget ? 'text-red-400' : 'text-gray-400'}`}>
                  {budgetUsage.toFixed(1)}% used
                </span>
              </div>
            </div>

            {isOverBudget && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 p-4 bg-red-500/20 border border-red-500/30 rounded-lg"
              >
                <p className="text-red-400 font-semibold">⚠️ Budget Exceeded</p>
                <p className="text-sm text-red-300">
                  You've exceeded your monthly budget by ₹{(monthlyExpense - budget).toFixed(2)}
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 glass p-6 rounded-lg"
        >
          <h2 className="text-xl font-bold text-white mb-4">Budget Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 rounded-lg">
              <h3 className="font-semibold text-white mb-2">🎯 Set Realistic Goals</h3>
              <p className="text-sm text-gray-400">
                Start with a budget based on your actual spending patterns from the last few months.
              </p>
            </div>
            <div className="p-4 bg-white/5 rounded-lg">
              <h3 className="font-semibold text-white mb-2">📊 Track Regularly</h3>
              <p className="text-sm text-gray-400">
                Check your budget progress weekly to stay on track and make adjustments as needed.
              </p>
            </div>
            <div className="p-4 bg-white/5 rounded-lg">
              <h3 className="font-semibold text-white mb-2">💡 Emergency Fund</h3>
              <p className="text-sm text-gray-400">
                Always keep some buffer in your budget for unexpected expenses.
              </p>
            </div>
            <div className="p-4 bg-white/5 rounded-lg">
              <h3 className="font-semibold text-white mb-2">📈 Review Monthly</h3>
              <p className="text-sm text-gray-400">
                At the end of each month, review what worked and what didn't in your budget.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Budget;