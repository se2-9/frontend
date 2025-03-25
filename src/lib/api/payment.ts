import { CardDTO } from '@/dtos/card';
import { PayWithCardData } from '../validations/payment';
import { apiClient, handleAxiosError } from './axios';
import { ApiResponse } from '@/types/api';

export async function payWithCard(data: PayWithCardData) {
  try {
    const res = await apiClient.post('/payment/pay-with-card', data);

    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function getTutorCard(): Promise<ApiResponse<CardDTO[]>> {
  try {
    const res = await apiClient.get('/user/get-cards');

    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}
