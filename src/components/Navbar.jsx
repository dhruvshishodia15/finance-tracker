import React from 'react';
import { User, Bell, Settings, Menu, X } from 'lucide-react';
import { useSidebar } from '../hooks/SidebarContext';

const Navbar = () => {
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10 transition-all duration-300 hover:bg-black/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Menu button and Logo */}
          <div className="flex items-center space-x-4">
            {/* Hamburger Menu Button */}
            <button
              onClick={toggleSidebar}
              className="p-2 text-gray-400 hover:text-white transition-colors duration-200 group md:hidden"
            >
              {isOpen ? (
                <X className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              ) : (
                <Menu className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              )}
            </button>

            {/* Logo/Brand */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold gradient-text hover:scale-105 transition-transform duration-200 cursor-pointer">FinanceTracker</h1>
              </div>
            </div>
          </div>

          {/* Right side - User actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="p-2 text-gray-400 hover:text-white transition-colors duration-200 relative group">
              <Bell className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
            </button>

            {/* Settings */}
            <button className="p-2 text-gray-400 hover:text-white transition-colors duration-200 group">
              <Settings className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            </button>

            {/* User Profile */}
            <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-white/10">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200 cursor-pointer">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-white">John Doe</p>
                <p className="text-xs text-gray-400">Premium User</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;