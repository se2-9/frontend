// pages/api/posts.ts
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

      // Destructure the validated data (now you can safely access these)
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
      // If validation fails, return a 400 error with detailed validation errors
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      // Handle any other unexpected errors
      return res.status(500).json({ error: 'Something went wrong' });
    }
  }

  // If the request method is not POST, return a 405 Method Not Allowed error
  return res.status(405).json({ error: 'Method Not Allowed' });
}

// lib/api/posts.ts
import { CreatePostData } from '@/lib/validations/posts';

export async function createPost(data: CreatePostData) {
  // Logic to handle post creation (you can replace this with actual database operations)
  return { message: 'Post created successfully!', post: data };
}
