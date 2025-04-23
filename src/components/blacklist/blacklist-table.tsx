import { addBlacklist, deleteBlacklist } from '@/lib/api/admin';
import { Blacklist } from '@/types/blacklist';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  ColumnDef,
  ColumnSort,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown, Trash2Icon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { Input } from '../ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Button } from '../ui/button';
import { CreateBlacklistDialog } from './create-blacklist-dialog';
import { getNonBlacklistUsers } from '@/lib/api/user';

interface BlacklistTableProps {
  data: Blacklist[];
  refetch: () => void;
}

export default function BlacklistTable({ data, refetch }: BlacklistTableProps) {
  const [search, setSearch] = useState('');
  const [sorting, setSorting] = useState<ColumnSort[]>([]);

  const { data: nonBlacklistUser, refetch: refetchUsers } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await getNonBlacklistUsers();
      return response.result;
    },
  });

  const filteredData =
    useMemo(() => {
      return data?.filter((req) => {
        const matchEmail = req.email
          .toLowerCase()
          .includes(search.toLowerCase());

        const matchContent = req.content
          .toLowerCase()
          .includes(search.toLowerCase());

        return matchEmail || matchContent;
      });
    }, [data, search]) || [];

  const addBlacklistMutation = useMutation({
    mutationFn: addBlacklist,
    onSuccess: (data) => {
      if (!data.success) {
        toast.error('Something went wrong');
        return;
      }
      toast.success('Accept successfully!');
      refetch();
      refetchUsers();
    },
    onError: (err) => {
      console.error('❌ Full error adding blacklist:', err);
      if (err instanceof Error) {
        toast.error(err.message || 'Error adding blacklist');
      } else {
        toast.error('Unexpected error');
      }
    },
  });

  const deleteBlacklistMutation = useMutation({
    mutationFn: deleteBlacklist,
    onSuccess: () => {
      toast.success('Deleted successfully!');
      refetch();
      refetchUsers();
    },
    onError: (err) => {
      console.error('❌ Error deleting:', err);
      toast.error('Failed to delete');
    },
  });

  const columns: ColumnDef<Blacklist>[] = [
    {
      accessorKey: 'email',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="flex items-center gap-1 font-medium"
        >
          Email
          <ArrowUpDown className="w-4 h-4" />
        </Button>
      ),
      cell: (info) => (
        <span className="font-medium">
          {(info.getValue() as string) ?? 'N/A'}
        </span>
      ),
    },
    {
      accessorKey: 'content',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="flex items-center gap-1 font-medium"
        >
          Content
          <ArrowUpDown className="w-4 h-4" />
        </Button>
      ),
      cell: (info) => (
        <span className="font-medium">{info.getValue() as string}</span>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const email = row.original.email;
        return (
          <Button
            variant="outline"
            className="hover:bg-red-400 hover:text-white"
            onClick={() => deleteBlacklistMutation.mutate(email)}
          >
            <Trash2Icon className="w-4 h-4 text-red-600" />
            Delete
          </Button>
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
      <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
        <Input
          placeholder="Search by email or content"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96"
        />
        {nonBlacklistUser && (
          <CreateBlacklistDialog
            users={nonBlacklistUser}
            onSubmit={(data) => {
              addBlacklistMutation.mutate(data);
            }}
          />
        )}
      </div>

      <div className="overflow-x-auto">
        <Table id="requests-table">
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
                <TableRow
                  id="requests-table-row"
                  data-testid="requests-table-row"
                  key={row.id}
                >
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
                  No blacklist found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
