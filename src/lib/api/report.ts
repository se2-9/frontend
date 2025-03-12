import { apiClient, handleAxiosError } from './axios';
import { ApiResponse } from '@/types/api';
import { CreateReportData, CreateReportSchema } from '../validations/report';
import { ReportDTO } from '@/dtos/report';

export async function createReport(data: CreateReportData) {
  const validatedData = CreateReportSchema.parse(data);
  try {
    const res = await apiClient.post('/report', validatedData);

    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function getReport(): Promise<ApiResponse<ReportDTO[]>> {
  try {
    const res = await apiClient.get('/report');

    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function deleteReport(reportId: string) {
  try {
    const res = await apiClient.delete(`/report/${reportId}`);

    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}
