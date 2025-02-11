import { create } from 'zustand';
import { apiClient } from '@/lib/api/axios'; // Import your apiClient
import { Post } from '@/types/post'; // Assuming the Post type is imported from a separate file
// import { useAuthStore } from '@/store/auth-store'; // Import the auth store to get the token

type PostStore = {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  loadPosts: () => void; // This function will now fetch posts from the backend
};

export const usePostStore = create<PostStore>((set) => ({
  posts: [],
  setPosts: (posts) => set({ posts }),

  // Load posts from the backend API using apiClient
  loadPosts: async () => {
    try {
      // Get the access token from the auth store
      // const { accessToken } = useAuthStore.getState();

      // if (!accessToken) {
      //   console.error('No access token found. Please log in.');
      //   return;
      // }

      // Set the Authorization header for the request
      // apiClient.defaults.headers['Authorization'] = `Bearer ${accessToken}`;

      // Fetch posts from the backend
      const response = await apiClient.get('/post');
      set({ posts: response.data }); // Set posts into the store
    } catch (error) {
      console.error('Error loading posts:', error);
    }
  },
}));
