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
import { ReportStatusBadge } from './report-status-badge';
import { Button } from '../ui/button';
import { ReportDTO } from '@/dtos/report';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { updateReport } from '@/lib/api/report';

interface ReportsTableProps {
  data: ReportDTO[];
  refetch: () => void;
}

export function ReportsTable({ data, refetch }: ReportsTableProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sorting, setSorting] = useState<ColumnSort[]>([]);

  const updateReportMutation = useMutation({
    mutationFn: updateReport,
    onSuccess: (data) => {
      if (!data.result) {
        toast.error('Something went wrong');
        return;
      }
      toast.success('Update successfully!');
      refetch();
    },
    onError: (err) => {
      if (err instanceof Error) {
        toast.error(err.message || 'Error update report');
      } else {
        toast.error('Unexpected error');
      }
    },
  });

  const handleUpdateReport = (
    report_id: string,
    content: string,
    status: string
  ) => {
    updateReportMutation.mutate({
      report_id: report_id,
      content: content,
      status: status,
    });
  };
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
    // {
    //   accessorKey: 'create_at',
    //   header: ({ column }) => (
    //     <button
    //       onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    //       className="flex items-center gap-1 font-medium"
    //     >
    //       Date Received <ArrowUpDown className="w-4 h-4" />
    //     </button>
    //   ),
    //   cell: (info) => (
    //     <span className="text-gray-600">
    //       {Intl.DateTimeFormat('en-CA').format(
    //         new Date(info.getValue() as string)
    //       ) ?? 'N/A'}
    //     </span>
    //   ),
    // },
    {
      accessorKey: 'content',
      header: 'content',
      cell: (info) => (
        <span className="font-medium">
          {(info.getValue() as string) ?? 'N/A'}
        </span>
      ),
    },
    {
      accessorKey: 'status',
      id: 'status',
      header: 'Status',
      cell: (info) => <ReportStatusBadge status={info.getValue() as string} />,
    },
    {
      accessorKey: 'report_id',
      id: 'report_id',
      header: 'Actions',
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        const id = row.getValue('report_id') as string;

        return (
          <div className="flex items-center gap-2">
            {status === 'pending' && (
              <Button
                className="bg-blue-500 hover:bg-blue-700"
                onClick={() => {
                  handleUpdateReport(id, row.getValue('content'), 'processing');
                }}
              >
                Mark as processing
              </Button>
            )}
            {status !== 'resolved' && (
              <Button
                className="bg-green-500 hover:bg-green-700"
                onClick={() => {
                  handleUpdateReport(id, row.getValue('content'), 'resolved');
                }}
              >
                Mark as resolved
              </Button>
            )}
          </div>
        );
      },
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
      <div className="flex flex-row justify-between">
        <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
          <Input
            placeholder="Search by report content or status..."
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
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
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
