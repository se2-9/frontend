import { RequestDTO } from '@/dtos/request';
import {
  AcceptRequest,
  AcceptRequestSchema,
  CreateRequest,
  CreateRequestSchema,
} from '../validations/request';
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

export async function createRequest(data: CreateRequest) {
  const validatedData = CreateRequestSchema.parse(data);
  try {
    const res = await apiClient.post('/request', validatedData);
    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function getAllRequestSentByTutor(): Promise<
  ApiResponse<RequestDTO[]>
> {
  try {
    const res = await apiClient.get('/request/tutor');
    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function cancelRequest(
  request_id: string
): Promise<ApiResponse<boolean>> {
  try {
    const res = await apiClient.delete(`/request/cancel/${request_id}`);

    if (res.status !== 200) {
      return {
        result: false,
        message: 'Failed to cancel request',
        success: false,
      };
    }

    return {
      result: true,
      success: true,
    };
  } catch (error) {
    throw handleAxiosError(error);
  }
}
