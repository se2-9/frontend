import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';

interface Props {
  data: { email: string; content: string }[];
  onDelete: (email: string) => void;
}

export default function BlacklistTable({ data, onDelete }: Props) {
  if (!data.length) return <p>No blacklist entries found.</p>;

  return (
    <Table className="mt-8 rounded-lg">
      <TableHeader className="bg-app-green">
        <TableRow>
          <TableHead className="text-app-text font-bold">Email</TableHead>
          <TableHead className="text-app-text font-bold">Content</TableHead>
          <TableHead className="text-app-text font-bold">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((entry) => (
          <TableRow key={entry.email}>
            <TableCell>{entry.email}</TableCell>
            <TableCell>{entry.content}</TableCell>
            <TableCell>
              <button
                onClick={() => onDelete(entry.email)}
                className="bg-red-500 text-white font-semibold px-3 py-1 rounded"
              >
                Delete
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
