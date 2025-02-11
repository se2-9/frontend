import { AxiosError } from 'axios';
import { CreatePostData } from '../validations/post';
import { createPostSchema } from '../validations/post';
import { apiClient } from './axios';
// import { useAuthStore } from '@/store/auth-store';
// import { refreshAccessToken } from './auth'; // Import refreshAccessToken function

export async function createPost(data: CreatePostData) {
  const validatedData = createPostSchema.parse(data);
  // let token = useAuthStore.getState().accessToken; // Get token

  // console.log('🟢 Token before request:', token); // Debug log
  // if (!token) {
  //   console.error('🔴 Authorization token is missing in Zustand');
  //   throw new Error('Authorization token is missing');
  // }

  try {
    const res = await apiClient.post(
      '/post',
      validatedData
      // headers: {
      //   Authorization: `Bearer ${token}`, // Ensure token is included
      // },
    );

    console.log('✅ Post created successfully:', res.data);
    return res.data;
  } catch (error) {
    console.error('❌ Error creating post:', error);

    // if (error instanceof AxiosError && error.response?.status === 401) {
    //   // If token is expired (401 Unauthorized)
    //   console.log('🟠 Token expired, attempting to refresh...');
    //   try {
    //     // Refresh the token
    //     const loginResponse = await refreshAccessToken();
    //     // token = loginResponse.token; // Update the token after refresh

    //     // Save the new token to Zustand store
    //     // useAuthStore.getState().setAccessToken(token);

    //     // Retry the original request with the new token
    //     // const retryRes = await apiClient.post('/post', validatedData, {
    //     //   headers: {
    //     //     Authorization: `Bearer ${token}`, // Use the new token
    //     //   },
    //     // });

    //     console.log(
    //       '✅ Post created successfully (after token refresh):',
    //       retryRes.data
    //     );
    //     return retryRes.data;
    //   } catch (refreshError) {
    //     console.error('❌ Failed to refresh token:', refreshError);
    //     throw new Error('Token refresh failed');
    //   }
    // }

    throw handleAxiosError(error);
  }
}

function handleAxiosError(error: unknown): Error {
  if (error instanceof AxiosError) {
    return new Error(error.response?.data.message || error.message);
  }
  return new Error('Something went wrong');
}
