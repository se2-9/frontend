import { PayWithCardData } from '../validations/payment';
import { apiClient, handleAxiosError } from './axios';

export async function payWithCard(data: PayWithCardData) {
  try {
    const res = await apiClient.post('/payment/pay-with-card', data);

    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}
