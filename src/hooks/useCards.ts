import { CardDTO } from '@/dtos/card';
import { getTutorCard } from '@/lib/api/payment';
import { ApiResponse } from '@/types/api';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export const useCards = (): UseQueryResult<ApiResponse<CardDTO[]>> => {
  return useQuery<ApiResponse<CardDTO[]>>({
    queryKey: ['cards'],
    queryFn: getTutorCard,
  });
};
