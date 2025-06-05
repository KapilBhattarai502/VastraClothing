import React from 'react';

import CancelIcon from '@mui/icons-material/Cancel';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


interface OrderStatusBadgeProps {
  status: string;
}

export const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status }) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending':
        return {
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icon: AccessTimeIcon,
          label: 'Pending'
        };
      case 'processing':
        return {
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: LocalShippingIcon,
          label: 'Processing'
        };
      case 'shipped':
        return {
          color: 'bg-purple-100 text-purple-800 border-purple-200',
          icon: LocalShippingIcon,
          label: 'Shipped'
        };
      case 'delivered':
        return {
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: CheckCircleIcon,
          label: 'Delivered'
        };
      case 'cancelled':
        return {
          color: 'bg-red-100 text-red-800 border-red-200',
          icon: CancelIcon,
          label: 'Cancelled'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: AccessTimeIcon,
          label: 'Unknown'
        };
    }
  };

  const config = getStatusConfig(status);
  const IconComponent = config.icon;

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${config.color}`}>
      <IconComponent className="w-3 h-3 mr-1" />
      {config.label}
    </span>
  );
};