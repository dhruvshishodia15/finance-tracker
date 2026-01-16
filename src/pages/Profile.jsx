import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useExpense } from '../hooks/ExpenseContext';
import { useSidebar } from '../hooks/SidebarContext';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import { LogOut, User, Moon } from 'lucide-react';

const Profile = () => {
  const { user, logout, totalBalance, expenses } = useExpense();
  const { isOpen } = useSidebar();

  const handleLogout = () => {
    logout();
  };

  const totalIncome = expenses
    .filter(exp => exp.type === 'income')
    .reduce((acc, exp) => acc + exp.amount, 0);

  const totalExpense = expenses
    .filter(exp => exp.type === 'expense')
    .reduce((acc, exp) => acc + exp.amount, 0);

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
          <h1 className="text-3xl font-bold text-white mb-2">Profile</h1>
          <p className="text-gray-400">Manage your account settings</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass p-6 rounded-lg"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{user?.name || 'User'}</h2>
                <p className="text-gray-400">{user?.email || 'user@example.com'}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Moon className="w-5 h-5 text-purple-400" />
                  <span className="text-white font-medium">Theme</span>
                </div>
                <span className="text-gray-400">Dark Mode</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">📊</span>
                  <span className="text-white font-medium">Total Transactions</span>
                </div>
                <span className="text-gray-400">{expenses.length}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass p-6 rounded-lg"
          >
            <h2 className="text-xl font-bold text-white mb-6">Financial Summary</h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-green-500/10 rounded-lg">
                <span className="text-green-400 font-medium">Total Income</span>
                <span className="text-green-400 font-bold">₹{totalIncome.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center p-4 bg-red-500/10 rounded-lg">
                <span className="text-red-400 font-medium">Total Expenses</span>
                <span className="text-red-400 font-bold">₹{totalExpense.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center p-4 bg-blue-500/10 rounded-lg">
                <span className="text-blue-400 font-medium">Net Balance</span>
                <span className={`font-bold ${totalBalance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  ₹{totalBalance.toFixed(2)}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 glass p-6 rounded-lg"
        >
          <h2 className="text-xl font-bold text-white mb-6">Account Actions</h2>

          <div className="flex space-x-4">
            <Button
              variant="danger"
              onClick={handleLogout}
              className="flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;