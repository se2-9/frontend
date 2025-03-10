import { useState, useMemo } from 'react';
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  ColumnSort,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RequestDTO } from '@/dtos/request';
import { ReportStatusBadge } from './report-status-badge';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '../ui/button';
import { ReportDTO } from '@/dtos/report';

interface ReportsTableProps {
  data: ReportDTO[];
}

export function ReportsTable({ data }: ReportsTableProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sorting, setSorting] = useState<ColumnSort[]>([]);

  const filteredData = useMemo(() => {
    return data.filter((req) => {
      const matchesSearch =
        req.content.toLowerCase().includes(search.toLowerCase()) ||
        req.status.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === 'all' || req.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter, data]);

  const columns: ColumnDef<ReportDTO>[] = [
    {
      accessorKey: 'created_at',
      header: ({ column }) => (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="flex items-center gap-1 font-medium"
        >
          Date Received <ArrowUpDown className="w-4 h-4" />
        </button>
      ),
      cell: (info) => (
        <span className="text-gray-600">
          {(info.getValue() as string) ?? 'N/A'}
        </span>
      ),
    },
    {
      accessorKey: 'content',
      header: 'Content',
      cell: (info) => (
        <span className="font-medium">
          {(info.getValue() as string) ?? 'N/A'}
        </span>
      ),
    },
    
    {
      accessorKey: 'status',
      header: 'Status',
      cell: (info) => <ReportStatusBadge status={info.getValue() as string} />,
    },
    {
      header: 'Actions',
      cell: () => (
        <Button className="bg-green-500 hover:bg-green-700">Accept</Button>
      ),
    },
  ];

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      {/* Search and Filter Inputs */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
        <Input
          placeholder="Search by report name or status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96"
        />

        <Select
          value={statusFilter}
          onValueChange={setStatusFilter}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="not paid">Not Paid</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="payment failed">Payment Failed</SelectItem>
            <SelectItem value="replaced">Replaced</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
            <SelectItem value="processing other">Processing Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center text-gray-500 py-4"
                >
                  No reports found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
