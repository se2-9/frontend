import React from 'react';

interface StatusBadgeProps {
  status: string;
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return '!bg-yellow-100 !text-yellow-600';
    case 'not paid':
      return '!bg-orange-100 !text-orange-600';
    case 'paid':
      return '!bg-green-100 !text-green-600';
    case 'payment failed':
      return '!bg-red-100 !text-red-600';
    case 'replaced':
      return '!bg-gray-100 !text-gray-600';
    case 'cancelled':
      return '!bg-purple-100 !text-purple-600';
    case 'processing other':
      return '!bg-blue-100 !text-blue-600';
    default:
      return '!bg-gray-200 !text-gray-700';
  }
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`px-3 py-1 rounded-lg text-sm font-medium ${getStatusColor(status)}`}
    >
      {status}
    </span>
  );
}
