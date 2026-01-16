import React from 'react';
import { Link, useLocation } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useSidebar } from '../hooks/SidebarContext';

const Sidebar = () => {
  const location = useLocation();
  const { isOpen, closeSidebar } = useSidebar();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/expenses', label: 'Expenses', icon: '💰' },
    { path: '/analytics', label: 'Analytics', icon: '📈' },
    { path: '/budget', label: 'Budget', icon: '🎯' },
    { path: '/profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={closeSidebar}
        />
      )}

      <motion.div
        initial={{ x: -250 }}
        animate={{ x: isOpen ? 0 : -250 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed left-0 top-0 h-full w-64 bg-dark-secondary border-r border-white/10 p-6 z-40"
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold gradient-text">ExpenseTracker</h1>
          <button
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
            onClick={closeSidebar}
            aria-label="Close sidebar"
          >
            <span style={{ fontSize: 24, fontWeight: 'bold' }}>&times;</span>
          </button>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => window.innerWidth < 768 && closeSidebar()}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                location.pathname === item.path
                  ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 text-white'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
      </motion.div>
    </>
  );
};

export default Sidebar;