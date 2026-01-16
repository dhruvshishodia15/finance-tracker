import React, { createContext, useContext, useState } from 'react';
import { mockExpenses } from '../utils/mockData';

const ExpenseContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useExpense = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpense must be used within an ExpenseProvider');
  }
  return context;
};

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState(mockExpenses);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [budget, setBudget] = useState(2000);

  const addExpense = (expense) => {
    setExpenses(prev => [...prev, { ...expense, id: Date.now() }]);
  };

  const updateExpense = (id, updatedExpense) => {
    setExpenses(prev => prev.map(exp => exp.id === id ? { ...exp, ...updatedExpense } : exp));
  };

  const deleteExpense = (id) => {
    setExpenses(prev => prev.filter(exp => exp.id !== id));
  };

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const totalBalance = expenses.reduce((acc, exp) => {
    return exp.type === 'income' ? acc + exp.amount : acc - exp.amount;
  }, 0);

  const monthlyIncome = expenses
    .filter(exp => exp.type === 'income' && new Date(exp.date).getMonth() === new Date().getMonth())
    .reduce((acc, exp) => acc + exp.amount, 0);

  const monthlyExpense = expenses
    .filter(exp => exp.type === 'expense' && new Date(exp.date).getMonth() === new Date().getMonth())
    .reduce((acc, exp) => acc + exp.amount, 0);

  const savings = monthlyIncome - monthlyExpense;

  const value = {
    expenses,
    user,
    budget,
    totalBalance,
    monthlyIncome,
    monthlyExpense,
    savings,
    addExpense,
    updateExpense,
    deleteExpense,
    login,
    logout,
    setBudget
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
};