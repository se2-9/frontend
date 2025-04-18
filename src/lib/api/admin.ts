import { apiClient, handleAxiosError } from './axios';
import { Blacklist } from '@/types/blacklist';
import { AxiosError } from 'axios';

export async function fetchAllBlacklist(): Promise<Blacklist[]> {
  try {
    const res = await apiClient.get<Blacklist[]>('/admin/blacklist');
    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function addBlacklist(entry: Blacklist): Promise<void> {
  try {
    await apiClient.post('/admin/blacklist', entry);
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function searchBlacklist(
  email: string
): Promise<Blacklist | null> {
  try {
    const res = await apiClient.get<Blacklist>(`/admin/blacklist/${email}`);
    return res.data;
  } catch (error) {
    if ((error as AxiosError)?.response?.status === 404) {
      return null;
    }
    throw handleAxiosError(error);
  }
}

export async function deleteBlacklist(email: string): Promise<void> {
  try {
    await apiClient.delete(`/admin/blacklist/${email}`);
  } catch (error) {
    throw handleAxiosError(error);
  }
}
