export type ApiResponse<T> = {
  success: boolean;
  result?: T;
  message?: string;
};
