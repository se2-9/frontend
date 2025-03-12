import { ReviewDTO } from '@/dtos/review';
import { apiClient, handleAxiosError } from './axios';
import { ApiResponse } from '@/types/api';
import { ReviewRequest } from '../validations/review';

export async function getTutorReviewsByTutorID(
  tutor_id: string
): Promise<ApiResponse<ReviewDTO[]>> {
  try {
    const res = await apiClient.get(`/review/${tutor_id}`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function reviewPost(
  data: ReviewRequest
): Promise<ApiResponse<ReviewDTO>> {
  try {
    const res = await apiClient.post('/review', data);
    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}
