import React from 'react';
import { SidebarItemProps } from '../../types';

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center justify-center w-full p-3 transition-colors hover:bg-gray-100 rounded-lg"
    >
      <div className="text-gray-700 mb-1">
        {icon}
      </div>
      <span className="text-xs text-gray-600 font-medium">{label}</span>
    </button>
  );
};

export default SidebarItem;