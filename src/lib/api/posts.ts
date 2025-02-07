import { NextApiRequest, NextApiResponse } from 'next';
import { createPostSchema } from '../validations/posts'; // Import the validation schema
import { z } from 'zod';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      // Validate the request body with Zod
      const validatedData = createPostSchema.parse(req.body);

      // Destructure the validated data
      const {
        title,
        Subject,
        Gender,
        OnlineOnsite,
        Place,
        HourlyRate,
        Description,
      } = validatedData;

      // Simulate saving the post to a database (or perform actual database operations here)
      return res.status(201).json({
        message: 'Post created successfully!',
        post: {
          title,
          Subject,
          Gender,
          OnlineOnsite,
          Place,
          HourlyRate,
          Description,
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      return res.status(500).json({ error: 'Something went wrong' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { id } = req.body;
      if (!id) {
        return res.status(400).json({ error: 'Post ID is required' });
      }

      // Simulate database deletion (soft delete or actual delete)
      return res.status(200).json({ message: 'Post deleted successfully!', id });
    } catch (error) {
      return res.status(500).json({ error: 'Something went wrong' });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}

import { CreatePostData } from '@/lib/validations/posts';

// Function to create a post
export async function createPost(data: CreatePostData) {
  return { message: 'Post created successfully!', post: data };
}

// Function to delete a post (Used in MyPosts.tsx)
export async function deletePost(postId: string) {
  const response = await fetch('/api/posts', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: postId }),
  });

  if (!response.ok) {
    throw new Error('Failed to delete post');
  }

  return { message: 'Post deleted successfully!', id: postId };
}

