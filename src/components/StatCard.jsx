import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon, color = 'blue', prefix = '', suffix = '' }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-cyan-500',
    green: 'from-green-500 to-emerald-500',
    red: 'from-red-500 to-pink-500',
    purple: 'from-purple-500 to-indigo-500'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="gradient-border p-6 rounded-lg bg-dark-secondary/50 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">
            {prefix}{value}{suffix}
          </p>
        </div>
        <div className={`p-3 rounded-lg bg-gradient-to-r ${colorClasses[color]} shadow-lg`}>
          <span className="text-2xl">{icon}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;