import React from 'react';

interface ReportStatusBadgeProps {
  status: string;
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return '!bg-yellow-100 !text-yellow-600';
    case 'resolved':
      return '!bg-green-100 !text-green-600';
    case 'processing':
        return '!bg-blue-100 !text-blue-600';
    default:
      return '!bg-gray-200 !text-gray-700';
  }
};

export function ReportStatusBadge({ status }: ReportStatusBadgeProps) {
  return (
    <span
      className={`px-3 py-1 rounded-lg text-sm font-medium ${getStatusColor(status)}`}
    >
      {status}
    </span>
  );
}
