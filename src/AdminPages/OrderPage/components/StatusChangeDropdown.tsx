import React, { useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface StatusChangeDropdownProps {
  currentStatus: string;
  onStatusChange: (newStatus: string) => void;
}

export const StatusChangeDropdown: React.FC<StatusChangeDropdownProps> = ({ 
  currentStatus, 
  onStatusChange 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const statusOptions = [
    { value: 'pending', label: 'Pending', color: 'text-yellow-600' },
    { value: 'processing', label: 'Processing', color: 'text-blue-600' },
    { value: 'shipped', label: 'Shipped', color: 'text-purple-600' },
    { value: 'delivered', label: 'Delivered', color: 'text-green-600' },
    { value: 'cancelled', label: 'Cancelled', color: 'text-red-600' }
  ];

  const currentStatusOption = statusOptions.find(option => option.value === currentStatus);

  const handleStatusChange = (newStatus: string) => {
    onStatusChange(newStatus);
    setIsOpen(false);
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
      >
        <span className={currentStatusOption?.color}>
          {currentStatusOption?.label}
        </span>
        <ArrowDropDownIcon className="ml-1 w-3 h-3" />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-1 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-20">
            <div className="py-1">
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleStatusChange(option.value)}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center justify-between transition-colors ${option.color}`}
                >
                  {option.label}
                  {currentStatus === option.value && (
                    <CheckIcon className="w-3 h-3" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};