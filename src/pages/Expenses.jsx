import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useExpense } from '../hooks/ExpenseContext';
import { useSidebar } from '../hooks/SidebarContext';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Input from '../components/Input';
import { categories, categoryColors } from '../utils/mockData';
import { Edit2, Trash2, Plus } from 'lucide-react';

const Expenses = () => {
  const { expenses, addExpense, updateExpense, deleteExpense } = useExpense();
  const { isOpen } = useSidebar();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    date: '',
    type: 'expense'
  });
  const [filter, setFilter] = useState({
    category: '',
    date: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const expenseData = {
      ...formData,
      amount: parseFloat(formData.amount)
    };

    if (editingExpense) {
      updateExpense(editingExpense.id, expenseData);
    } else {
      addExpense(expenseData);
    }

    setIsModalOpen(false);
    setEditingExpense(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      amount: '',
      category: '',
      date: '',
      type: 'expense'
    });
  };

  const openAddModal = () => {
    resetForm();
    setEditingExpense(null);
    setIsModalOpen(true);
  };

  const openEditModal = (expense) => {
    setFormData({
      title: expense.title,
      amount: expense.amount.toString(),
      category: expense.category,
      date: expense.date,
      type: expense.type
    });
    setEditingExpense(expense);
    setIsModalOpen(true);
  };

  const filteredExpenses = expenses.filter(expense => {
    const matchesCategory = !filter.category || expense.category === filter.category;
    const matchesDate = !filter.date || expense.date.includes(filter.date);
    return matchesCategory && matchesDate;
  });

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Navbar />
      <Sidebar />

      <div className={`pt-20 px-8 pb-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Expenses</h1>
            <p className="text-gray-400">Manage your income and expenses</p>
          </div>
          <Button onClick={openAddModal} className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Transaction</span>
          </Button>
        </div>

        <div className="flex space-x-4 mb-6">
          <select
            value={filter.category}
            onChange={(e) => setFilter({ ...filter, category: e.target.value })}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <Input
            type="month"
            value={filter.date}
            onChange={(e) => setFilter({ ...filter, date: e.target.value })}
            placeholder="Filter by month"
            className="w-48"
          />
        </div>

        <div className="space-y-4">
          {filteredExpenses.map((expense) => (
            <motion.div
              key={expense.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass p-4 rounded-lg flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: categoryColors[expense.category] }}
                />
                <div>
                  <h3 className="font-semibold text-white">{expense.title}</h3>
                  <p className="text-sm text-gray-400">
                    {expense.category} • {new Date(expense.date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className={`font-bold ${expense.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                  {expense.type === 'income' ? '+' : '-'}₹{expense.amount.toFixed(2)}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => openEditModal(expense)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4 text-gray-400" />
                  </button>
                  <button
                    onClick={() => deleteExpense(expense.id)}
                    className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingExpense ? 'Edit Transaction' : 'Add Transaction'}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter transaction title"
              required
            />

            <Input
              label="Amount"
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              placeholder="Enter amount"
              required
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              >
                <option value="">Select category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <Input
              label="Date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Type</label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="expense"
                    checked={formData.type === 'expense'}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="mr-2"
                  />
                  <span className="text-white">Expense</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="income"
                    checked={formData.type === 'income'}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="mr-2"
                  />
                  <span className="text-white">Income</span>
                </label>
              </div>
            </div>

            <div className="flex space-x-4 pt-4">
              <Button type="submit" className="flex-1">
                {editingExpense ? 'Update' : 'Add'} Transaction
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default Expenses;