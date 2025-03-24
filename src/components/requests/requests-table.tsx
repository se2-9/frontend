import { useState, useMemo, useEffect } from 'react';
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
import { StatusBadge } from './status-badge';
import { ArrowUpDown, Eye } from 'lucide-react';
import { Button } from '../ui/button';
import { acceptRequest, cancelRequest } from '@/lib/api/request';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { PostDTO } from '@/dtos/post';
import { PostDetailsDialog } from '../posts/post-details-dialog';

interface RequestsTableProps {
  data: RequestDTO[] | undefined;
  refetch: () => void;
  isTutor: boolean;
}

export function RequestsTable({
  data,
  refetch,
  isTutor = false,
}: RequestsTableProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sorting, setSorting] = useState<ColumnSort[]>([]);
  const [isShowingDetail, setIsShowingDetail] = useState(false);
  const [currentPostDetail, setCurrentPostDetail] = useState<
    PostDTO | undefined
  >(undefined);

  const [requests, setRequests] = useState<RequestDTO[]>(data || []);

  const filteredData = useMemo(() => {
    return requests.filter((req) => {
      const matchesSearch =
        req.tutor_id.toLowerCase().includes(search.toLowerCase()) ||
        req.status.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === 'all' || req.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter, requests]);

  // const filteredData =
  //   useMemo(() => {
  //     return data?.filter((req) => {
  //       const matchesSearch =
  //         req.tutor_id.toLowerCase().includes(search.toLowerCase()) ||
  //         req.status.toLowerCase().includes(search.toLowerCase());

  //       const matchesStatus =
  //         statusFilter === 'all' || req.status === statusFilter;

  //       return matchesSearch && matchesStatus;
  //     });
  //   }, [search, statusFilter, data]) || [];

  const acceptRequestMutation = useMutation({
    mutationFn: acceptRequest,
    onSuccess: (data) => {
      if (!data.result) {
        toast.error('Something went wrong');
        return;
      }
      toast.success('Accept successfully!');
      refetch();
    },
    onError: (err) => {
      console.error('❌ Full error accepting request:', err);
      if (err instanceof Error) {
        toast.error(err.message || 'Error accepting request');
      } else {
        toast.error('Unexpected error');
      }
    },
  });

  const cancelRequestMutation = useMutation({
    mutationFn: cancelRequest,
    onSuccess: (data) => {
      if (!data.result) {
        toast.error('Something went wrong');
        return;
      }
      toast.success('Cancel successfully!');
      refetch();
    },
    onError: (err) => {
      console.error('❌ Full error cancelling request:', err);
      if (err instanceof Error) {
        toast.error(err.message || 'Error cancelling request');
      } else {
        toast.error('Unexpected error');
      }
    },
  });

  useEffect(() => {
    if (!data) return; // Avoid subscribing if no data

    const chargeId = 'yourChargeId'; // Replace with dynamic value

    const eventSource = new EventSource(
      `http://localhost:8080/api/v1/payment/sse/${chargeId}`
    );

    eventSource.onmessage = (event) => {
      const updatedStatus = JSON.parse(event.data);

      // 🔹 Update data state efficiently
      setData((prevData) =>
        prevData.map((req) =>
          req.id === updatedStatus.id
            ? { ...req, status: updatedStatus.status }
            : req
        )
      );

      // Optional: Trigger toast notifications
      toast.info(
        `Request ${updatedStatus.id} updated to ${updatedStatus.status}`
      );
    };

    evtSource.addEventListener('charge.create', (e) => {
      console.log({ event: e });
      toast.success('Payment successful!');
      refetch();
      evtSource.close();
      setIsProcessing(false);
      onClose();
    });

    eventSource.onerror = (error) => {
      console.error('SSE Error:', error);
      eventSource.close(); // Auto-reconnect prevention
    };

    return () => {
      eventSource.close(); // Cleanup on unmount
    };
  }, [data]); // 🔥 Depend only on `data` to prevent redundant re-subscriptions

  const handleViewDetail = (post: PostDTO) => {
    // console.log(postDTO)
    setCurrentPostDetail(post);
    setIsShowingDetail(true);
  };
  const handleAcceptRequest = (request_id: string, tutor_id: string) => {
    acceptRequestMutation.mutate({
      request_id: request_id,
      tutor_id: tutor_id,
    });
  };

  const handleCancelRequest = (request_id: string) => {
    cancelRequestMutation.mutate(request_id);
  };

  const columns: ColumnDef<RequestDTO>[] = [
    {
      accessorKey: isTutor ? 'post.title' : 'tutor_name',
      header: ({ column }) => (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="flex items-center gap-1 font-medium"
        >
          {isTutor ? 'Title' : 'Name'}
          <ArrowUpDown className="w-4 h-4" />
        </button>
      ),
      cell: (info) => (
        <span className="font-medium">
          {(info.getValue() as string) ?? 'N/A'}
        </span>
      ),
    },
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
      cell: (info) => {
        const rawDate = info.getValue() as string;
        const formattedDate = new Date(rawDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });

        return <span className="text-gray-600">{formattedDate}</span>;
      },
    },
    {
      accessorKey: 'post',
      header: 'View Detail',
      cell: (info) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            handleViewDetail(info.row.original.post);
          }}
          className="flex items-center gap-2"
        >
          <Eye
            size={16}
            className="text-primary"
          />
          View Details
        </Button>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: (info) => <StatusBadge status={info.getValue() as string} />,
    },
    ...(!isTutor
      ? [
          {
            header: 'Accept',
            cell: (info) => {
              const request_id = info.row.original.id;
              const tutor_id = info.row.original.tutor_id;
              const status = info.row.original.status;

              return (
                <Button
                  onClick={() => handleAcceptRequest(request_id, tutor_id)}
                  className="bg-green-500 hover:bg-green-700"
                  disabled={status !== 'pending'}
                >
                  Accept
                </Button>
              );
            },
          } as ColumnDef<RequestDTO, unknown>,
        ]
      : []),
    ...(isTutor
      ? [
          {
            header: 'Action',
            cell: (info) => {
              const request_id = info.row.original.id;
              const status = info.row.original.status;

              return (
                <div className="flex items-center gap-2">
                  <Button
                    //onClick={() => handlePayment(request_id)}
                    className="bg-blue-500 hover:bg-blue-700"
                    disabled={
                      status !== 'not paid' && status !== 'payment failed'
                    }
                  >
                    Pay
                  </Button>
                  <Button
                    onClick={() => handleCancelRequest(request_id)}
                    className="bg-red-400 hover:bg-red-500"
                    disabled={
                      status !== 'pending' && status !== 'processing other'
                    }
                  >
                    Cancel
                  </Button>
                </div>
              );
            },
          } as ColumnDef<RequestDTO, unknown>,
        ]
      : []),
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
          placeholder="Search by tutor or status..."
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
                  No requests found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <PostDetailsDialog
        isOpen={isShowingDetail}
        onClose={() => setIsShowingDetail(false)}
        post={currentPostDetail}
      />
    </div>
  );
}
