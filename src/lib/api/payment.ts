import { Blacklist } from '@/types/blacklist';
import { apiClient, handleAxiosError } from './axios';
import { ApiResponse } from '@/types/api';

export async function fetchAllBlacklist(): Promise<ApiResponse<Blacklist[]>> {
  try {
    const res = await apiClient.get('/admin/blacklist');
    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function addBlacklist(
  entry: Blacklist
): Promise<ApiResponse<null>> {
  try {
    const res = await apiClient.post('/admin/blacklist', entry);
    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function searchBlacklist(
  email: string
): Promise<ApiResponse<Blacklist | null>> {
  try {
    const res = await apiClient.get(`/admin/blacklist/${email}`);
    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function deleteBlacklist(
  email: string
): Promise<ApiResponse<null>> {
  try {
    const res = await apiClient.delete(`/admin/blacklist/${email}`);
    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}
