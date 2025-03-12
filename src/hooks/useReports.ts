import { ReportDTO } from '@/dtos/report';
import { getReport } from '@/lib/api/report';
import { ApiResponse } from '@/types/api';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export const useReports = (): UseQueryResult<ApiResponse<ReportDTO[]>> => {
  return useQuery<ApiResponse<ReportDTO[]>>({
    queryKey: ['reports'],
    queryFn: getReport,
  });
};
