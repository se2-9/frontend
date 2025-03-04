import { RequestDTO } from '@/dtos/request';
import { AcceptRequest, AcceptRequestSchema } from '../validations/request';
import { ApiResponse } from '@/types/api';
import { apiClient, handleAxiosError } from './axios';

export async function acceptRequest(
  data: AcceptRequest
): Promise<ApiResponse<RequestDTO>> {
  const validatedData = AcceptRequestSchema.parse(data);
  try {
    const res = await apiClient.post('/request/accept', validatedData);
    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function getAllStudentRequests(): Promise<
  ApiResponse<RequestDTO[]>
> {
  try {
    const res = await apiClient.get('/request/student');
    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}
